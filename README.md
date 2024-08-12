

# Micro Credit Application with Machine Learning

## Description

This project includes a comprehensive loan application system featuring user authentication, a machine learning model for loan eligibility, and a React frontend. The system evaluates loan applications based on various financial metrics and user profiles, providing loan approval status, risk scores, and EMI calculations.

## Table of Contents

- [Node.js Authentication API](#nodejs-authentication-api)
- [Machine Learning Model Documentation](#machine-learning-model-documentation)
- [React Application](#react-application)
- [Installation](#installation)

## Node.js Authentication API

### Description

This Node.js API handles user authentication and registration functionalities. It uses JWT tokens for session management and protects access to certain endpoints.

### API Documentation

#### `/signup`

- **Method**: POST
- **Description**: Registers a new user.
- **Request Body**:
  - `name`: String (optional) - User's name.
  - `phone`: String (optional) - User's phone number.
  - `email`: String (required) - User's email address.
  - `password`: String (required) - User's password.
- **Response**:
  - **Success**:
    - **Status Code**: 201 Created
    - **Body**:
      ```json
      {
        "success": true,
        "message": "User registered successfully."
      }
      ```
  - **Error**:
    - **Status Code**: 400 Bad Request
    - **Body**:
      ```json
      {
        "success": false,
        "message": "Validation error or user already exists."
      }
      ```

#### `/login`

- **Method**: POST
- **Description**: Authenticates a user and provides a JWT token.
- **Request Body**:
  - `email`: String (required) - User's email address.
  - `password`: String (required) - User's password.
- **Response**:
  - **Success**:
    - **Status Code**: 200 OK
    - **Body**:
      ```json
      {
        "success": true,
        "message": "Login successful.",
        "token": "jwt-token-here"
      }
      ```
  - **Error**:
    - **Status Code**: 401 Unauthorized
    - **Body**:
      ```json
      {
        "success": false,
        "message": "Invalid email or password."
      }
      ```

### Error Handling

- Errors are returned with appropriate HTTP status codes and descriptive messages.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the `auth` directory:
   ```bash
   cd auth
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Usage

1. Start the Node.js server:
   ```bash
   npm start
   ```
2. The API will be accessible at `http://localhost:8080`.

## Machine Learning Model Documentation

### Description

The machine learning model evaluates loan eligibility and risk based on applicant data. It predicts loan approval, calculates the maximum loan amount, and assesses risk scores using the applicant's financial information.

### Features Used

The following features are used in the model:

- `current_salary`: **Current Salary** - The applicant's current salary to determine their financial capacity.
-`previous_hike_amount`: **Previous Hike Amount** The amount of the previous salary hike.
-`expected_next_hike_amount`: **Expected NextHike Amount** The anticipated amount of the next salary hike
- `loan_amount`: **Requested Loan Amount** - The amount the applicant is requesting to borrow.
- `residential_assets_value`: **Residential Assets Value** - The value of the applicant's residential properties.
- `commercial_assets_value`: **Commercial Assets Value** - The value of the applicant's commercial properties.
- `luxury_assets_value`: **Luxury Assets Value** - The value of the applicant's luxury items.
- `current_emis`: **Existing EMIs** - Existing EMI payments to assess the applicant's current financial obligations.
- `credit_score`: **Credit Score** - A measure of the applicant's creditworthiness.
- `cibil_score`: **CIBIL Score** - A score used in India to evaluate credit risk.
- `total_monthly_mall_expenditure`: **Monthly Mall Expenditure** - Total spending at malls, which indicates discretionary spending.
- `emi_amount`: **EMI Amount** - The amount the applicant can pay monthly towards the loan.
- `annual_interest_rate`: **Annual Interest Rate** - The interest rate on the loan.
- `frequency_of_mall_visits`: **Frequency of Mall Visits** - How often the applicant visits malls, affecting spending habits.
- `average_spending_per_visit`: **Average Spending per Visit** - Average amount spent during each mall visit.
- `savings_per_month`: **Monthly Savings** - Amount saved by the applicant each month.
- `other_monthly_expenses`: **Other Monthly Expenses** - Other financial obligations not covered by existing EMIs.

### API Documentation

#### `/predict/`

- **Method**: POST
- **Description**: Predicts loan approval, calculates the maximum loan amount, and assesses risk score based on applicant data.
- **Request Body**:
  - `current_salary`: Float - Applicant's current salary.
  - `loan_amount`: Float - Requested loan amount.
  - `residential_assets_value`: Float - Value of residential assets.
  - `commercial_assets_value`: Float - Value of commercial assets.
  - `luxury_assets_value`: Float - Value of luxury assets.
  - `current_emis`: Float - Existing EMI payments.
  - `credit_score`: Float - Applicant's credit score.
  - `cibil_score`: Float - Applicant's CIBIL score.
  - `total_monthly_mall_expenditure`: Float - Total monthly expenditure at malls.
  - `emi_amount`: Float - EMI amount applicant can pay.
  - `annual_interest_rate`: Float - Annual interest rate of the loan.
  - `frequency_of_mall_visits`: Integer - Number of mall visits per month.
  - `average_spending_per_visit`: Float - Average spending per mall visit.
  - `savings_per_month`: Float - Monthly savings.
  - `other_monthly_expenses`: Float - Other monthly expenses.
  -  `previous_hike_amount`: Float - Previous Hike Amount,
  -`expected_next_hike_amount`: Float -Expect  Next Hike Amount

- **Response**:
  - **Success**:
    - **Status Code**: 200 OK
    - **Body**:
      ```json
      {
        "status": "approved",
        "amount": 50000,
        "emi_period": 24,
        "risk_score": 15.2
      }
      ```
  - **Error**:
    - **Status Code**: 422 Unprocessable Entity
    - **Body**:
      ```json
      {
        "detail": "Validation error or missing fields."
      }
      ```
    - **Status Code**: 500 Internal Server Error
    - **Body**:
      ```json
      {
        "detail": "Unexpected error occurred."
      }
      ```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
4. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Usage

1. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
2. The API will be accessible at `http://localhost:8000`.

## React Application

### Description

The React application provides a user-friendly interface for interacting with the loan application system. Users can register, log in, and apply for loans through the web application.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the `react-app` directory:
   ```bash
   cd react-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the React application at `http://localhost:3000`.



