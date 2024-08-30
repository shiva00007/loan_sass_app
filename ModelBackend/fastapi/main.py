from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
import joblib
import pandas as pd
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import math

# Initialize the FastAPI app
app = FastAPI()

# To add a cross Orgin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained machine learning model
model = joblib.load('./model7.pkl')

# Define the model
class Applicant(BaseModel):
    current_salary: float
    previous_salary: float
    previous_hike_amount: float
    expected_next_hike_amount: float
    current_emis: float
    savings_per_month: float
    residential_assets_value: float
    commercial_assets_value: float
    luxury_assets_value: float
    credit_score: float
    cibil_score: float
    loan_amount: float
    interest_rate: float

# Define the list of features used by the model for prediction
features = [
    'current_salary', 'previous_salary', 'previous_hike_amount', 'expected_next_hike_amount',
    'residential_assets_value', 'commercial_assets_value', 'luxury_assets_value',
    'cibil_score', 'credit_score', 'loan_amount', 'savings_per_month',
    'current_emis', 'interest_rate'
]

def calculateEmi(principal: float, annual_rate: float, months: int) -> float:
    if months <= 0:
        return None  # Invalid number of months
    
    r = annual_rate / 12 / 100  # Convert annual rate to monthly and percentage to decimal

    if r == 0:
        return principal / months

    # EMI formula calculation
    emi = (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1)
    return emi

def calculateRiskScore(applicant_df: pd.DataFrame) -> float:
    # To check the probablity of risk score
    risk_probabilities = model.predict_proba(applicant_df)[0]

    rejection_probability = risk_probabilities[0]  # Probability of rejection
    print(risk_probabilities)
    print(rejection_probability)

    return rejection_probability * 100  # Convert to percentage

def calculateLoanAndEmi(applicant: Applicant) -> dict:
   
    # applicant salary
    salary = applicant.current_salary 
    # //asset values
    assetsValue = (applicant.residential_assets_value +
                   applicant.commercial_assets_value +
                   applicant.luxury_assets_value)
    # exsiting emi

    existingLiabilities = applicant.current_emis
    # //credit score
    creditScore = applicant.credit_score
    loanAmount = applicant.loan_amount
    annualInterestRate = applicant.interest_rate

    # To calculate the ratio for lonnincome
    loanIncomeRatio = loanAmount / salary if salary > 0 else 0
    repaymentRatio = existingLiabilities / salary if salary > 0 else 0
    
    # Calculate salary to loan ratio dynamically
    salaryToLoanRatio = loanIncomeRatio / repaymentRatio if repaymentRatio > 0 else 0
    print(salaryToLoanRatio)

    # Calculate maximum loan amount based on salary and assets
    maxLoanBasedOnSalary = salary * salaryToLoanRatio 
    maxLoanBasedOnAssets = 0.5 * assetsValue
    adjustedMaxLoan = min(maxLoanBasedOnSalary, maxLoanBasedOnAssets) - existingLiabilities
    print(adjustedMaxLoan)

    # Adjust loan amount based on credit score
    if creditScore < 300:
        adjustedMaxLoan *= 0.5  # Very poor credit
    elif 300 <= creditScore <= 550:
        adjustedMaxLoan *= 0.6  # Poor credit
    elif 551 <= creditScore <= 620:
        adjustedMaxLoan *= 0.7  # Low credit
    elif 621 <= creditScore <= 700:
        adjustedMaxLoan *= 0.8  # Fair credit
    elif 701 <= creditScore <= 749:
        adjustedMaxLoan *= 0.9  # Good credit
    else:
        adjustedMaxLoan *= 1.0  # Excellent credit

    # Base loan amount based on credit score
    maxLoanAmount = max(0, adjustedMaxLoan)
    print(maxLoanAmount)

    # Convert the applicant's data to a Pandas DataFrame
    applicantDict = applicant.dict()
    applicantDf = pd.DataFrame([applicantDict])
    
    # Ensure DataFrame only contains the features used in the model
    if not all(feature in applicantDict for feature in features):
        raise HTTPException(status_code=400, detail="Missing required features in applicant data")
    
    applicantDf = applicantDf[features]

    # Calculate the risk score
    riskScore = calculateRiskScore(applicantDf)

    # Check if requested loan amount exceeds the maximum allowed loan amount
    if loanAmount > maxLoanAmount:
        loanApprovalStatus = "rejected"
        emiAmount = None
        emiPeriodMonths = None
    else:
        # Use the model to predict the loan approval status
        predict_loan_approval = model.predict(applicantDf)[0]
        print(predict_loan_approval)

        # Determine loan approval status based on model prediction
        loanApprovalStatus = "approved" if predict_loan_approval == 1 else "rejected"

        # Determine EMI amount and period if the loan is approved
        emiAmount = None
        emiPeriodMonths = None
        if loanApprovalStatus == "approved":
            # Iterate over possible EMI periods from 12 to 60 months
            for period in range(12, 61, 6):
                emi = calculateEmi(maxLoanAmount, annualInterestRate, period)
                if emi is not None and emi <= (salary * 0.4):  # Ensure EMI is not more than 40% of salary
                    emiAmount = round(emi, 2)
                    emiPeriodMonths = period
                    break  # Break the loop once a valid period is found

    return {
        "loanApprovalStatus": loanApprovalStatus,
        "maxLoanAmount": maxLoanAmount,
        "riskScore": riskScore,
        "emiAmount": emiAmount,
        "emiPeriodMonths": emiPeriodMonths
    }

@app.get("/")
async def root():
    """Root endpoint to check if the API is working."""
    return {"message": "Loan Approval API"}

@app.post("/predict")
async def predict_loan_approval(applicant: Applicant):
    """Prediction endpoint to evaluate loan approval and related details."""
    try:
        # Calculate loan amount and risk, then return the result
        result = calculateLoanAndEmi(applicant)
        return JSONResponse(content=jsonable_encoder(result), status_code=200)
    except ValidationError as e:
        # Handle validation errors and return a 400 Bad Request response
        raise HTTPException(status_code=400, detail=e.errors())
    except HTTPException as e:
        # Handle HTTP exceptions and return the error message
        raise e
    except Exception as e:
        # Handle unexpected errors and return a 500 Internal Server Error response
        return JSONResponse(content={"detail": str(e)}, status_code=500)
