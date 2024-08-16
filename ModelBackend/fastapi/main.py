# Import necessary libraries 
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
import joblib
import pandas as pd
import math
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# Initialize the FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from any origin, 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained machine learning model 
model = joblib.load('./model3.pkl')

# Define the Applicant data model using Pydantic with all the necessary fields
class Applicant(BaseModel):
    current_salary: float
    loan_amount: float
    residential_assets_value: float
    commercial_assets_value: float
    luxury_assets_value: float
    current_emis: float
    credit_score: float
    cibil_score: float
    total_monthly_mall_expenditure: float
    emi_amount: float
    annual_interest_rate: float
    frequency_of_mall_visits: int
    average_spending_per_visit: float
    savings_per_month: float
    other_monthly_expenses: float
    previous_hike_amount: float
    expected_next_hike_amount: float

# Define the list of features used by the model for prediction
features = [
    'current_salary', 'loan_amount', 'residential_assets_value', 'commercial_assets_value',
    'luxury_assets_value', 'loan_to_income_ratio', 'spending_to_income_ratio',
    'repayment_to_income_ratio', 'credit_score', 'cibil_score',
    'savings_per_month', 'average_spending_per_visit', 'other_monthly_expenses',
    'total_monthly_mall_expenditure', 'emi_amount', 'current_emis',
    'previous_hike_amount', 'expected_next_hike_amount'
]

#calculate loan amount and risk score for an applicant
def calculate_loan_amount_and_risk(applicant: Applicant):
    # Convert the applicant's data to a Pandas DataFrame
    applicant_dict = applicant.dict()
    applicant_df = pd.DataFrame([applicant_dict])

    # Perform feature engineering to create additional features
    applicant_df['loan_to_income_ratio'] = applicant_df['loan_amount'] / applicant_df['current_salary']
    applicant_df['spending_to_income_ratio'] = applicant_df['total_monthly_mall_expenditure'] / applicant_df['current_salary']
    applicant_df['repayment_to_income_ratio'] = applicant_df['emi_amount'] / applicant_df['current_salary']

    # DataFrame only contains the features  uses in a  model
    applicant_df = applicant_df[features]

    # Use the model to predict the loan approval status
    loan_status = model.predict(applicant_df)[0] 

    # Calculate the risk score as the probability of loan rejection
    risk_score = model.predict_proba(applicant_df)[0][0] * 100  # Probability of being rejected
    print(risk_score)

    # Extract relevant applicant data for loan amount calculation
    salary = applicant.current_salary
    assets_value = (applicant.residential_assets_value +
                    applicant.commercial_assets_value +
                    applicant.luxury_assets_value)
    existing_liabilities = applicant.current_emis
    credit_score = applicant.credit_score
    loan_amount = applicant.loan_amount
    annual_interest_rate = applicant.annual_interest_rate

    #  loan eligibility criteria based on salary and assets
    salary_to_loan_ratio = 4
    max_loan_based_on_salary = salary * salary_to_loan_ratio
    max_loan_based_on_assets = 0.5 * assets_value
    adjusted_max_loan = min(max_loan_based_on_salary, max_loan_based_on_assets) - existing_liabilities

    # creditScore Define 
    if credit_score < 600:
        adjusted_max_loan *= 0.8

    # to caluculathe maxloanAmount
    max_loan_amount = max(0, adjusted_max_loan)

    # D loan approval status based on the requested loan amount
    loan_approval_status = "approved" if loan_amount <= max_loan_amount else "rejected"

    # Handle the case where the loan is rejected
    if loan_approval_status == "rejected":
        return {
            "loan_approval_status": loan_approval_status,
            "message": "Loan application rejected. The requested loan amount exceeds the maximum loan amount that can be granted based on the applicant's profile and credit score.",
            "max_loan_amount": max_loan_amount,
            "risk_score": risk_score,
            "emi_period_months": None
        }

    # Function to calculate the EMI payment period
    def calculate_emi_period(principal, annual_rate, emi_amount):
        if emi_amount <= 0:
            return None  # Invalid EMI amount

        r = annual_rate / 12 / 100  # Monthly interest rate
        if r == 0:
            return 1 if emi_amount >= principal else math.ceil(principal / emi_amount)

        if emi_amount >= principal:
            return 1  # Can be paid off in one month

        try:
            # Calculate the number of months needed to repay the loan
            n = math.log(emi_amount / (emi_amount - principal * r)) / math.log(1 + r)
            return math.ceil(n)
        except ValueError:
            return None  

    # EMI payment period based on the loan amount, interest rate, and EMI amount
    emi_period_months = calculate_emi_period(loan_amount, annual_interest_rate, applicant.emi_amount)

    # Return the result including loan approval status, maximum loan amount, risk score, and EMI period
    return {
        "loan_approval_status": loan_approval_status,
        "max_loan_amount": max_loan_amount,
        "risk_score": risk_score,
        "emi_period_months": emi_period_months
    }


@app.get("/")
async def root():
    return {"message": "Loan Approval API"}

#  prediction endpoint that accepts applicant data and returns loan approval status
@app.post("/predict")
async def predict_loan_approval(applicant: Applicant):
    try:
        #  calculate loan amount and risk, then return the result
        result = calculate_loan_amount_and_risk(applicant)
        return JSONResponse(content=jsonable_encoder(result), status_code=200)
    except ValidationError as e:
        # Handle validation errors and return a 400 Bad Request response
        raise HTTPException(status_code=400, detail=e.errors())
