import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  // Destructure responseData
  const { responseData } = location.state || {};

  if (!responseData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
        {/* Display message when no data is available */}
        No data available
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Title of the details section */}
        <h1 className="text-3xl font-bold text-white mb-6">Loan Details</h1>

        <div className="space-y-4">
          {/* Loan Amount Display */}
          <div className="bg-gray-800 p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">Loan Amount:</span> Rs
              {responseData.amount}
            </p>
          </div>
          {/* Approval Status Display */}
          <div className="bg-gray-gradient p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">Approval Status:</span>{" "}
              {responseData.status}
            </p>
          </div>
          {/* EMI Period Display */}
          <div className="bg-gray-gradient p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">EMI Period:</span>{" "}
              {responseData.emi_period} months
            </p>
          </div>
          {/* Risk Score Display */}
          <div className="bg-gray-gradient p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">Risk Score:</span>{" "}
              {responseData.risk_score}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
