import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaShoppingCart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0b1221] text-white py-16 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="text-pink-500 text-2xl">
              <FaShoppingCart />
            </div>

            <h2 className="text-3xl font-bold tracking-tighter">
              <span className="text-pink-500">E</span>KART
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Powering Your World with the Best in Electronics.
          </p>

          <div className="text-gray-400 text-sm space-y-1">
            <p>123 Electronics St, Style City, NY 10001</p>
            <p>
              Email:
              <span className="hover:text-pink-500 cursor-pointer ml-1">
                support@Zaptro.com
              </span>
            </p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Customer Service</h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">
              Order Tracking
            </li>
            <li className="hover:text-white cursor-pointer">Size Guide</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Follow Us</h3>

          <div className="flex gap-5">
            <FaFacebookF className="cursor-pointer hover:text-pink-500 transition" />
            <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
            <FaTwitter className="cursor-pointer hover:text-pink-500 transition" />
            <FaPinterestP className="cursor-pointer hover:text-pink-500 transition" />
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Stay in the Loop</h3>

          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get special offers, free giveaways, and more
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white text-gray-900 px-4 py-2.5 outline-none w-full text-sm"
            />

            <button className="bg-pink-600 hover:bg-pink-700 transition px-6 py-2.5 font-semibold text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 <span className="text-pink-500 font-medium">EKart</span>. All
          rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;