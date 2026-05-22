import { Phone, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-8">
      {/*Main Container*/}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-center md:text-left py-6 px-4 sm:px-6">
        {/*Contact section */}
        <div className="w-full md:flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-4 text-white">Contact us</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-2">
            <Phone size={16} />
            Phone : +91 88259 38529
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-2 break-all">
            <Mail size={16} /> Email : shop-mart@gmail.com
          </p>
        </div>
        {/*Social section */}
        <div className="w-full md:flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-4 text-white">Follow us</h3>
          <div className="flex gap-4 md:justify-start items-center justify-center">
            <a
              href="#"
              target="_blank"
              className="h-10 text-gray-100 hover:text-gray-100 transition-transform duration-300 hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              target="_blank"
              className="h-10 text-gray-100 hover:text-pink-500 transition-transform duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              className="h-10 text-gray-100 hover:text-blue-500 transition-transform duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              target="_blank"
              className="h-10 text-gray-100 hover:text-red-500 transition-transform duration-300 hover:scale-110"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
        {/*about section */}
        <div className="w-full md:flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-4 text-white">About us</h3>
          <p className="text-gray-400 leading-relaxed text-sm md:p-0  text-justify p-5">
            Shop-Mart is your one-stop destination for quality products at
            affordable prices. We focus on delivering a smooth, secure, and
            convenient shopping experience. Our goal is to make online shopping
            easy, fast, and reliable for everyone.
          </p>
        </div>
      </div>
      {/*Cpoy right section */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Shop-Mart.All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
