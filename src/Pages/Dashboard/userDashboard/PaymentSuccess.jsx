import React from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div>

      <Confetti />
      </div>
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6">Thank you for your payment.</p>
      <Link
        to="/dashboard/my-parcels"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default PaymentSuccess;
