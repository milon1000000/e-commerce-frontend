import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentFaild() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-2 text-gray-600">Something went wrong. Try again.</p>

      <button
        onClick={() => navigate("/cart")}
        className="mt-6 px-6 py-2 bg-black text-white rounded"
      >
        Back to Cart
      </button>
    </div>
  );
}

export default PaymentFaild;