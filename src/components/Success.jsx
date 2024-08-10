import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const { responseData } = location.state || {};

  if (!responseData) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold text-white">Loan Details</h1>
      <div className="mt-4">
        <p className="text-white">Loan Amount: {responseData.loan_amount}</p>
        <p className="text-white">
          Approval Status: {responseData.approval_status}
        </p>
        <p className="text-white">EMI Period: {responseData.emi_period}</p>
        <p className="text-white">Risk Score: {responseData.risk_score}</p>
      </div>
    </div>
  );
};

export default Success;
