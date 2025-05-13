// @ts-nocheck

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full mb-6">
      <nav className="items-center pt-5 px-4 mx-4 max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
        <h1 className="text-white font-bold text-4xl xl:text-5xl">
          <span className="bg-gradient-to-r from-green-600 to-yellow-600 text-transparent bg-clip-text">
            Agro
          </span>
          <span className="bg-gradient-to-r from-yellow-600 to-red-600 text-transparent bg-clip-text">SEN</span>
        </h1>
        <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
          <li className="bg-amber-800 text-transparent bg-clip-text">
            <a href="/Dashboard" className="">Imagerie</a>
          </li>
          <li className="bg-amber-800 text-transparent bg-clip-text">
            <a href="/Correction">Forum</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
