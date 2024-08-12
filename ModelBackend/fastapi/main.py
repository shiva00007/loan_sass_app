from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
import joblib
import pandas as pd
import math
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = joblib.load('./model3.pkl')

# Define the applicant data model with additional fields
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

# Define features used in model
features = [
    'current_salary', 'loan_amount', 'residential_assets_value', 'commercial_assets_value',
    'luxury_assets_value', 'loan_to_income_ratio', 'spending_to_income_ratio',
    'repayment_to_income_ratio', 'credit_score', 'cibil_score',
    'savings_per_month', 'average_spending_per_visit', 'other_monthly_expenses',
    'total_monthly_mall_expenditure', 'emi_amount', 'current_emis',
    'previous_hike_amount', 'expected_next_hike_amount'
]

def calculate_loan_amount_and_risk(applicant: Applicant):
    # Create a DataFrame for the applicant
    applicant_dict = applicant.dict()
    applicant_df = pd.DataFrame([applicant_dict])

    # Feature engineering
    applicant_df['loan_to_income_ratio'] = applicant_df['loan_amount'] / applicant_df['current_salary']
    applicant_df['spending_to_income_ratio'] = applicant_df['total_monthly_mall_expenditure'] / applicant_df['current_salary']
    applicant_df['repayment_to_income_ratio'] = applicant_df['emi_amount'] / applicant_df['current_salary']

    # Ensure the same columns are used
    applicant_df = applicant_df[features]

    # Predict loan status
    loan_status = model.predict(applicant_df)[0]

    # Calculate the risk score (using probability of rejection)
    risk_score = model.predict_proba(applicant_df)[0][0] * 100  # Probability of being rejected

    # Calculate loan amount based on applicant's profile
    salary = applicant.current_salary
    assets_value = (applicant.residential_assets_value +
                    applicant.commercial_assets_value +
                    applicant.luxury_assets_value)
    existing_liabilities = applicant.current_emis
    credit_score = applicant.credit_score
    loan_amount = applicant.loan_amount
    annual_interest_rate = applicant.annual_interest_rate

    # Define loan eligibility criteria
    salary_to_loan_ratio = 4
    max_loan_based_on_salary = salary * salary_to_loan_ratio
    max_loan_based_on_assets = 0.5 * assets_value
    adjusted_max_loan = min(max_loan_based_on_salary, max_loan_based_on_assets) - existing_liabilities

    if credit_score < 600:
        adjusted_max_loan *= 0.8

    max_loan_amount = max(0, adjusted_max_loan)

    # Determine if the loan is approved
    loan_approval_status = "approved" if loan_amount <= max_loan_amount else "rejected"

    if loan_approval_status == "rejected":
        return {
            "loan_approval_status": loan_approval_status,
            "message": "Loan application rejected. The requested loan amount exceeds the maximum loan amount that can be granted based on the applicant's profile and credit score.",
            "max_loan_amount": max_loan_amount,
            "risk_score": risk_score,
            "emi_period_months": None
        }

    # Calculate EMI payment period
    def calculate_emi_period(principal, annual_rate, emi_amount):
        if emi_amount <= 0:
            return None  # Invalid EMI amount

        r = annual_rate / 12 / 100
        if r == 0:
            return 1 if emi_amount >= principal else math.ceil(principal / emi_amount)

        if emi_amount >= principal:
            return 1  # Can be paid off in one month

        try:
            n = math.log(emi_amount / (emi_amount - principal * r)) / math.log(1 + r)
            return math.ceil(n)
        except ValueError:
            return None  # Calculation not possible

    emi_period_months = calculate_emi_period(loan_amount, annual_interest_rate, applicant.emi_amount)

    return {
        "loan_approval_status": loan_approval_status,
        "max_loan_amount": max_loan_amount,
        "risk_score": risk_score,
        "emi_period_months": emi_period_months
    }

@app.get("/")
async def root():
    return {"message": "API is running. Use POST /predict/ to submit applicant data."}

@app.post("/predict/")
async def predict(applicant: Applicant):
    try:
        result = calculate_loan_amount_and_risk(applicant)
        return JSONResponse(content=jsonable_encoder({
            "status": result["loan_approval_status"],
            "amount": result["max_loan_amount"],
            "emi_period": result["emi_period_months"],
            "risk_score": result["risk_score"]
        }))
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
