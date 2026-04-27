import React from "react";

function Features() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Free Shipping */}
        <div className="flex items-center gap-5 p-6 bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-4.446-3.542-7.125-7.125-7.125H9.125c-.621 0-1.125.504-1.125 1.125v10.375m9 4.5V11.25m-9 3h9m-9 0c-1.242 0-2.25 1.008-2.25 2.25s1.008 2.25 2.25 2.25h1.312"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Free Shipping
            </h3>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              On orders over $50
            </p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="flex items-center gap-5 p-6 bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Secure Payment
            </h3>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              100% secure transactions
            </p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="flex items-center gap-5 p-6 bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-50 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              24/7 Support
            </h3>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Always here to help
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
