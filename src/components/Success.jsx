import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  // Destructure responseData
  const { responseData } = location.state || {};

  console.log(responseData);
  if (!responseData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
        {/* Display message when no data is available */}
        No data available
      </div>
    );
  }

  console.log(responseData);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Title of the details section */}
        <h1 className="text-3xl font-bold text-white mb-6">Loan Details</h1>

        {/* Approval Status Display */}
        <div className="bg-gray-gradient p-4 rounded-md">
          <p className="text-white text-lg">
            <span className="font-semibold">Approval Status:</span>{" "}
            {responseData.loanApprovalStatus}
          </p>
        </div>
        <div className="space-y-4">
          {/* Loan Amount Display */}
          <div className="bg-gray-800 p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">Loan Amount: </span>
              <span>Rs {responseData.maxLoanAmount}</span>
            </p>
          </div>
          {/* EMI Amount Display */}
          <div className="bg-gray-gradient p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">EMI Amount: </span> Rs{" "}
              {responseData.emiAmount}
            </p>
          </div>
          {/* EMI Period Display */}
          <div className="bg-gray-gradient p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">EMI Period: </span>{" "}
              {responseData.emiPeriodMonths} months
            </p>
          </div>
          {/* Risk Score Display */}
          <div className="bg-gray-gradient p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">Risk Score:</span>{" "}
              {responseData.riskScore}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
