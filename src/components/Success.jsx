import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const { responseData } = location.state || {};
  console.log("Success");
  console.log(responseData.status);

  if (!responseData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
        No data available
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-6">Loan Details</h1>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">Loan Amount:</span> Rs
              {responseData.amount}
            </p>
          </div>
          <div className="bg-gray-gradient  p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">Approval Status:</span>{" "}
              {responseData.status}
            </p>
          </div>
          <div className="bg-gray-gradient  p-4 rounded-md">
            <p className="text-white text-lg">
              <span className="font-semibold">EMI Period:</span>{" "}
              {responseData.emi_period} months
            </p>
          </div>
          <div className="bg-gray-gradient  p-4 rounded-md">
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
