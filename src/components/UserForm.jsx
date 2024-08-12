import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaMailBulk,
  FaPhone,
  FaUser,
  FaMapMarkerAlt,
  FaHome,
  FaRupeeSign,
  FaBehanceSquare,
  FaSourcetree,
} from "react-icons/fa";

import FormInput from "./FormInput";
import { FaScaleBalanced } from "react-icons/fa6";

const UserForm = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    ownsHouse: "",
    maritalStatus: "",

    // Employment Information
    currentSalary: "",
    previousSalary: "",
    previousHikeAmount: "", // Added field
    expectedNextHikeAmount: "", // Added field

    // Spending Information
    groceryExpense: "",
    currentEmis: "",
    frequencyOfMallVisits: "",
    averageSpendingPerVisit: "",
    savingsPerMonth: "",
    otherMonthlyExpenses: "",
    rentAmount: "",

    // Asset Information
    residentialAssetsValue: "",
    commercialAssetsValue: "",
    luxuryAssetsValue: "",

    // Credit Information
    creditScore: "",
    cibilScore: "",

    // Loan Information
    loanAmount: "",
    emiAmount: "",
    loanPurpose: "", // Added field
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data for API request
    const requestData = {
      current_salary: parseFloat(formData.currentSalary) || 0,
      loan_amount: parseFloat(formData.loanAmount) || 0,
      residential_assets_value:
        parseFloat(formData.residentialAssetsValue) || 0,
      commercial_assets_value: parseFloat(formData.commercialAssetsValue) || 0,
      luxury_assets_value: parseFloat(formData.luxuryAssetsValue) || 0,
      current_emis: parseFloat(formData.currentEmis) || 0,
      credit_score: parseFloat(formData.creditScore) || 0,
      cibil_score: parseFloat(formData.cibilScore) || 0,
      total_monthly_mall_expenditure: parseFloat(formData.groceryExpense) || 0,
      emi_amount: parseFloat(formData.emiAmount) || 0,
      annual_interest_rate: parseFloat(formData.annualInterestRate) || 0,
      frequency_of_mall_visits: parseFloat(formData.frequencyOfMallVisits) || 0,
      average_spending_per_visit:
        parseFloat(formData.averageSpendingPerVisit) || 0,
      savings_per_month: parseFloat(formData.savingsPerMonth) || 0,
      other_monthly_expenses: parseFloat(formData.otherMonthlyExpenses) || 0,
      previous_hike_amount: parseFloat(formData.previousHikeAmount) || 0,
      expected_next_hike_amount:
        parseFloat(formData.expectedNextHikeAmount) || 0,
    };

    console.log(requestData);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict/",
        requestData
      );
      console.log("Response data:", response.data);

      navigate("/success", { state: { responseData: response.data } });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white">Welcome 👋🏻</h1>
          <p className="text-white">Let us know about yourself</p>
        </section>

        {/* Personal Information */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="name"
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your Name"
              icon={<FaUser />}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your Email"
              icon={<FaMailBulk />}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="phone"
              name="phone"
              type="tel"
              label="Phone"
              placeholder="Enter your phone number"
              icon={<FaPhone />}
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FormInput
              id="address"
              name="address"
              type="text"
              label="Address"
              placeholder="Enter Your Address"
              icon={<FaMapMarkerAlt />}
              value={formData.address}
              onChange={handleInputChange}
            />
            <FormInput
              id="owns-house"
              name="ownsHouse"
              type="text"
              label="Owns House (Yes / No)"
              placeholder="Enter Yes or No"
              icon={<FaHome />}
              value={formData.ownsHouse}
              onChange={handleInputChange}
            />
            <FormInput
              id="marital-status"
              name="maritalStatus"
              type="text"
              label="Married Status"
              placeholder="Enter Marital Status (e.g., Single, Married)"
              value={formData.maritalStatus}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Employment Information */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Employment Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="company"
              name="company"
              type="text"
              label="Company"
              placeholder="Enter your Company Name"
              icon={<FaBehanceSquare />}
              value={formData.company}
              onChange={handleInputChange}
            />
            <FormInput
              id="current-salary"
              name="currentSalary"
              type="number"
              label="Current Salary"
              placeholder="Enter your current salary"
              icon={<FaRupeeSign />}
              value={formData.currentSalary}
              onChange={handleInputChange}
              required
            />
            <FormInput
              id="previous-salary"
              name="previousSalary"
              type="number"
              label="Previous Salary"
              placeholder="Enter Previous Salary"
              icon={<FaRupeeSign />}
              value={formData.previousSalary}
              onChange={handleInputChange}
            />
            <FormInput
              id="previous-hike-amount"
              name="previousHikeAmount"
              type="number"
              label="Previous Hike Amount"
              placeholder="Enter Previous Hike Amount"
              icon={<FaRupeeSign />}
              value={formData.previousHikeAmount}
              onChange={handleInputChange}
            />
            <FormInput
              id="expected-next-hike-amount"
              name="expectedNextHikeAmount"
              type="number"
              label="Expected Next Hike Amount"
              placeholder="Enter Expected Next Hike Amount"
              icon={<FaRupeeSign />}
              value={formData.expectedNextHikeAmount}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Spending and Saving Information */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            Spending and Saving Information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="grocery-expense"
              name="groceryExpense"
              type="number"
              label="Grocery Expense"
              placeholder="Enter Grocery Expense"
              icon={<FaRupeeSign />}
              value={formData.groceryExpense}
              onChange={handleInputChange}
            />
            <FormInput
              id="current-emis"
              name="currentEmis"
              type="number"
              label="Current EMIs"
              placeholder="Enter Current EMIs"
              icon={<FaRupeeSign />}
              value={formData.currentEmis}
              onChange={handleInputChange}
            />
            <FormInput
              id="frequency-of-mall-visits"
              name="frequencyOfMallVisits"
              type="number"
              label="Frequency of Mall Visits"
              placeholder="Enter Frequency of Mall Visits"
              icon={<FaRupeeSign />}
              value={formData.frequencyOfMallVisits}
              onChange={handleInputChange}
            />
            <FormInput
              id="average-spending-per-visit"
              name="averageSpendingPerVisit"
              type="number"
              label="Average Spending per Visit"
              placeholder="Enter Average Spending per Visit"
              icon={<FaRupeeSign />}
              value={formData.averageSpendingPerVisit}
              onChange={handleInputChange}
            />
            <FormInput
              id="savings-per-month"
              name="savingsPerMonth"
              type="number"
              label="Savings per Month"
              placeholder="Enter Savings per Month"
              icon={<FaRupeeSign />}
              value={formData.savingsPerMonth}
              onChange={handleInputChange}
            />
            <FormInput
              id="other-monthly-expenses"
              name="otherMonthlyExpenses"
              type="number"
              label="Other Monthly Expenses"
              placeholder="Enter Other Monthly Expenses"
              icon={<FaRupeeSign />}
              value={formData.otherMonthlyExpenses}
              onChange={handleInputChange}
            />
            <FormInput
              id="rent-amount"
              name="rentAmount"
              type="number"
              label="Rent Amount"
              placeholder="Enter Rent Amount"
              icon={<FaRupeeSign />}
              value={formData.rentAmount}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Asset Information */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Asset Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="residential-assets-value"
              name="residentialAssetsValue"
              type="number"
              label="Residential Assets Value"
              placeholder="Enter Residential Assets Value"
              icon={<FaRupeeSign />}
              value={formData.residentialAssetsValue}
              onChange={handleInputChange}
            />
            <FormInput
              id="commercial-assets-value"
              name="commercialAssetsValue"
              type="number"
              label="Commercial Assets Value"
              placeholder="Enter Commercial Assets Value"
              icon={<FaRupeeSign />}
              value={formData.commercialAssetsValue}
              onChange={handleInputChange}
            />
            <FormInput
              id="luxury-assets-value"
              name="luxuryAssetsValue"
              type="number"
              label="Luxury Assets Value"
              placeholder="Enter Luxury Assets Value"
              icon={<FaRupeeSign />}
              value={formData.luxuryAssetsValue}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Credit Information */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Credit Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="credit-score"
              name="creditScore"
              type="number"
              label="Credit Score"
              placeholder="Enter Credit Score"
              icon={<FaSourcetree />}
              value={formData.creditScore}
              onChange={handleInputChange}
            />
            <FormInput
              id="cibil-score"
              name="cibilScore"
              type="number"
              label="CIBIL Score"
              placeholder="Enter CIBIL Score"
              icon={<FaSourcetree />}
              value={formData.cibilScore}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Loan Information */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Loan Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="loan-amount"
              name="loanAmount"
              type="number"
              label="Loan Amount"
              placeholder="Enter Loan Amount"
              icon={<FaRupeeSign />}
              value={formData.loanAmount}
              onChange={handleInputChange}
            />
            <FormInput
              id="emi-amount"
              name="emiAmount"
              type="number"
              label="EMI Amount"
              placeholder="Enter EMI Amount"
              icon={<FaRupeeSign />}
              value={formData.emiAmount}
              onChange={handleInputChange}
            />
            <FormInput
              id="loan-purpose"
              name="loanPurpose"
              type="text"
              label="Loan Purpose"
              placeholder="Enter the purpose of the loan"
              value={formData.loanPurpose}
              onChange={handleInputChange}
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
