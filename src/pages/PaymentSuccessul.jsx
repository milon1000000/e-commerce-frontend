import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccessul() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful</h1>
      <p className="mt-2 text-gray-600">Your order has been placed successfully</p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-black text-white rounded"
      >
        Go Home
      </button>
    </div>
  );
}

export default PaymentSuccessul;