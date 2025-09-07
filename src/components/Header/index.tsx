import React from "react";

const Header = () => {
  return (
    <div className="flex items-center space-x-8 h-[64px] relative">
      <h1 className="text-[20px] font-bold text-black uppercase mr-12">LOGO</h1>
      <nav className="flex space-x-8">
        <a href="#" className="text-[16px] text-gray-900">
          Shop
        </a>
        <a href="#" className="text-[16px] text-gray-900">
          About
        </a>
        <a href="#" className="text-[16px] text-gray-900">
          Contact
        </a>
        <a href="#" className="text-[16px] text-gray-900">
          Sale
        </a>
        <a href="#" className="text-[16px] text-gray-900">
          Gender
        </a>
      </nav>
      <div className="flex gap-8.5 right-0 absolute">
        <img src="/user.svg" alt="User" className="w-6 h-6" />
        <img src="/cart.svg" alt="cart" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Header;
