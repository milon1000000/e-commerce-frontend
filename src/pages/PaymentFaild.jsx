import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { FaTimesCircle } from "react-icons/fa";

function PaymentFaild() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-xs">
            <FaTimesCircle />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Payment Failed</h1>
          <p className="mt-2 text-slate-500 text-sm">
            We couldn't process your payment. Please verify your payment details and try again.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition-all text-sm"
            >
              Back to Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all text-sm"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFaild;