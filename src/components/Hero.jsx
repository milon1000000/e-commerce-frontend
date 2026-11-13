import React from "react";

function Hero() {
  return (
    <section className="bg-linear-to-r from-blue-700 via-blue-600 to-sky-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* text section */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Latest Electronics <br /> at Best Prices
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-8 text-blue-100">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-white text-blue-600 px-6 py-3 font-semibold rounded-xl hover:bg-blue-50 shadow-md hover:shadow-lg transition-all">
                Shop Now
              </button>

              <button className="bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-blue-600 px-6 py-3 font-semibold rounded-xl transition-all">
                View Deals
              </button>
            </div>
          </div>

          {/* image section */}
          <div className="relative flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-2xl">
              <img
                src="/home.webp"
                alt="Electronics"
                className="w-full max-w-125 rounded-xl shadow-lg"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;