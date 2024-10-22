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

const UserForm = () => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    ownsHouse: "",
    maritalStatus: "",
    currentSalary: "",
    previousSalary: "",
    previousHikeAmount: "",
    expectedNextHikeAmount: "",
    currentEmis: "",
    savingsPerMonth: "",
    residentialAssetsValue: "",
    commercialAssetsValue: "",
    luxuryAssetsValue: "",
    creditScore: "",
    cibilScore: "",
    loanAmount: "",
    annualInterestRate: "",
    loanPurpose: "",
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

    const requestData = {
      current_salary: formData.currentSalary,
      previous_salary: formData.previousSalary,
      previous_hike_amount: formData.previousHikeAmount,
      expected_next_hike_amount: formData.expectedNextHikeAmount,
      current_emis: formData.currentEmis,
      savings_per_month: formData.savingsPerMonth,
      residential_assets_value: formData.residentialAssetsValue,
      commercial_assets_value: formData.commercialAssetsValue,
      luxury_assets_value: formData.luxuryAssetsValue,
      credit_score: formData.creditScore,
      cibil_score: formData.cibilScore,
      loan_amount: formData.loanAmount,
      interest_rate: formData.annualInterestRate,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/predict/",
        requestData
      );
      navigate("/success", { state: { responseData: response.data } });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Form Sections */}
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
              pattern="^[A-Za-z\s]+$"
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
              pattern="^(\+\d{1,3}\s?)?(\d{10}|\d{3}[\s-]\d{3}[\s-]\d{4}|\(\d{3}\)[\s-]\d{3}[\s-]\d{4})$"
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
              pattern="^[\w\s,.-]+$"
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
              pattern="^(Yes|No)$"
            />
            <FormInput
              id="marital-status"
              name="maritalStatus"
              type="text"
              label="Marital Status"
              placeholder="Enter Marital Status (e.g., Single, Married)"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              pattern="^[A-Za-z\s]+$"
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
              pattern="^[A-Za-z\s]+$"
            />
            <FormInput
              id="current-salary"
              name="currentSalary"
              type="text"
              label="Current Salary"
              placeholder="Enter your current salary"
              icon={<FaRupeeSign />}
              value={formData.currentSalary}
              onChange={handleInputChange}
              required
              pattern="^\d+(\.\d{1,2})?$"
            />
            <FormInput
              id="previous-salary"
              name="previousSalary"
              type="text"
              label="Previous Salary"
              placeholder="Enter Previous Salary"
              icon={<FaRupeeSign />}
              value={formData.previousSalary}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
            />
            <FormInput
              id="previous-hike-amount"
              name="previousHikeAmount"
              type="text"
              label="Previous Hike Amount"
              placeholder="Enter Previous Hike Amount"
              icon={<FaRupeeSign />}
              value={formData.previousHikeAmount}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
            />
            <FormInput
              id="expected-next-hike-amount"
              name="expectedNextHikeAmount"
              type="text"
              label="Expected Next Hike Amount"
              placeholder="Enter Expected Next Hike Amount"
              icon={<FaRupeeSign />}
              value={formData.expectedNextHikeAmount}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
            />
            <FormInput
              id="savings-per-month"
              name="savingsPerMonth"
              type="text"
              label="Savings per Month"
              placeholder="Enter Savings per Month"
              icon={<FaRupeeSign />}
              value={formData.savingsPerMonth}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
            />
            <FormInput
              id="current-emis"
              name="currentEmis"
              type="text"
              label="Current EMIs"
              placeholder="Enter your Current EMIs"
              icon={<FaSourcetree />}
              value={formData.currentEmis}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
            />
          </div>
        </section>

        {/* Financial Information */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Financial Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="residential-assets-value"
              name="residentialAssetsValue"
              type="text"
              label="Residential Assets Value"
              placeholder="Enter Residential Assets Value"
              icon={<FaRupeeSign />}
              value={formData.residentialAssetsValue}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
              required
            />
            <FormInput
              id="commercial-assets-value"
              name="commercialAssetsValue"
              type="text"
              label="Commercial Assets Value"
              placeholder="Enter Commercial Assets Value"
              icon={<FaRupeeSign />}
              value={formData.commercialAssetsValue}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
              required
            />
            <FormInput
              id="luxury-assets-value"
              name="luxuryAssetsValue"
              type="text"
              label="Luxury Assets Value"
              placeholder="Enter Luxury Assets Value"
              icon={<FaRupeeSign />}
              value={formData.luxuryAssetsValue}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
              required
            />
            <FormInput
              id="credit-score"
              name="creditScore"
              type="text"
              label="Credit Score"
              placeholder="Enter Credit Score"
              value={formData.creditScore}
              onChange={handleInputChange}
              pattern="^\d{3,}$"
              required
            />
            <FormInput
              id="cibil-score"
              name="cibilScore"
              type="text"
              label="CIBIL Score"
              placeholder="Enter CIBIL Score"
              value={formData.cibilScore}
              onChange={handleInputChange}
              pattern="^\d{3,}$"
              required
            />
          </div>
        </section>

        {/* Loan Information */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Loan Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="loan-amount"
              name="loanAmount"
              type="text"
              label="Loan Amount"
              placeholder="Enter Loan Amount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
              required
            />
            <FormInput
              id="annual-interest-rate"
              name="annualInterestRate"
              type="text"
              label="Annual Interest Rate"
              placeholder="Enter Annual Interest Rate"
              value={formData.annualInterestRate}
              onChange={handleInputChange}
              pattern="^\d+(\.\d{1,2})?$"
              required
            />
            <FormInput
              id="loan-purpose"
              name="loanPurpose"
              type="text"
              label="Loan Purpose"
              placeholder="Enter Purpose for Loan"
              value={formData.loanPurpose}
              onChange={handleInputChange}
              pattern="^[A-Za-z\s]+$"
              required
            />
          </div>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-4 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default UserForm;
