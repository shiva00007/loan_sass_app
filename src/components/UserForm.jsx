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
} from "react-icons/fa";

import FormInput from "./FormInput";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    currentSalary: "",
    previousSalary: "",
    groceryExpense: "",
    currentEmis: "",
    ownsHouse: "",
    rentAmount: "",
    datePreviousHike: "",
    dateNextHike: "",
    bankName: "",
    pan: "",
    loanAmount: "",
    emiAmount: "",
    residentialAssetsValue: "",
    commercialAssetsValue: "",
    luxuryAssetsValue: "",
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

    // Prepare data for API request
    const requestData = {
      current_salary: parseFloat(formData.currentSalary) || 0,
      loan_amount: parseFloat(formData.loanAmount) || 0,
      residential_assets_value:
        parseFloat(formData.residentialAssetsValue) || 0,
      commercial_assets_value: parseFloat(formData.commercialAssetsValue) || 0,
      luxury_assets_value: parseFloat(formData.luxuryAssetsValue) || 0,
      current_emis: parseFloat(formData.currentEmis) || 0,
      credit_score: parseFloat(formData.pan) || 0, //
      cibil_score: parseFloat(formData.pan) || 0, // R
      total_monthly_mall_expenditure: parseFloat(formData.groceryExpense) || 0,
      emi_amount: parseFloat(formData.emiAmount) || 0,
      annual_interest_rate: 0, // Default value, adjust if need
      frequency_of_mall_visits: 0, // Default value, adjust if need
      average_spending_per_visit: parseFloat(formData.groceryExpense) || 0,
      savings_per_month: 0, // Default value, adjust if needed
      other_monthly_expenses: parseFloat(formData.rentAmount) || 0,
    };

    //model backend api call with all features
    try {
      const response = await axios.post(
        "http://localhost:8000/predict/",
        requestData
      );
      console.log("Response data:", response.data);

      // Navigate to success page with response data
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
              label="Username"
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
              label="Mobile Number"
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
              label="Owns House (Yes/No)"
              placeholder="Enter Yes or No"
              icon={<FaHome />}
              value={formData.ownsHouse}
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
              label="Company Name"
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
              label="Previous Salary Hike"
              placeholder="Enter previous salary hike"
              icon={<FaRupeeSign />}
              value={formData.previousSalary}
              onChange={handleInputChange}
            />
            <FormInput
              id="date-next-hike"
              name="dateNextHike"
              type="text"
              label="Estimated Next Salary Hike"
              placeholder="Estimated Next Salary Hike"
              icon={<FaRupeeSign />}
              value={formData.dateNextHike}
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
              id="savings-month"
              name="currentSalary"
              type="number"
              label="Savings For Month"
              placeholder="Enter Savings For Month"
              icon={<FaRupeeSign />}
              value={formData.currentSalary}
              onChange={handleInputChange}
              required
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
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="grocery-expense"
              name="groceryExpense"
              type="number"
              label="Approximate Grocery Expense per Month"
              placeholder="Enter Grocery Expense"
              icon={<FaRupeeSign />}
              value={formData.groceryExpense}
              onChange={handleInputChange}
            />
            <FormInput
              id="rent-amount"
              name="rentAmount"
              type="number"
              label="Rent Amount (if applicable)"
              placeholder="Enter Rent Amount"
              icon={<FaRupeeSign />}
              value={formData.rentAmount}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Assets Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Assets Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="residential-assets"
              name="residentialAssetsValue"
              type="number"
              label="Residential Assets Value"
              placeholder="Enter Residential Assets Value"
              icon={<FaRupeeSign />}
              value={formData.residentialAssetsValue}
              onChange={handleInputChange}
              required
            />
            <FormInput
              id="commercial-assets"
              name="commercialAssetsValue"
              type="number"
              label="Commercial Assets Value"
              placeholder="Enter Commercial Assets Value"
              icon={<FaRupeeSign />}
              value={formData.commercialAssetsValue}
              onChange={handleInputChange}
            />
            <FormInput
              id="luxury-assets"
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

        {/* Loan Details */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Loan Details</h2>
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
              required
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
              label="Purpose of Loan"
              placeholder="Enter Loan Purpose"
              value={formData.loanPurpose}
              onChange={handleInputChange}
            />
          </div>
        </section>

        <button
          type="submit"
          className="px-5 h-10 bg-blue-gradient text-white w-full rounded-lg mt-3 hover:bg-green-500 font-bold"
        >
          Predict
        </button>
      </form>
    </div>
  );
};

export default UserForm;
