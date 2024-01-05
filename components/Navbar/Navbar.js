// Navbar.js
"use client"

import Link from "next/link";
import ThemeToggler from "../Theme/ThemeToggler";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-bold">
          Slack With AI
        </Link>

        <div className="space-x-4">
          <Link href="/" className="text-white">
          Home
          </Link>
          <a href="/signin" className='text-white'>
            Login
          </a>
        </div>
        <div className='mr-2'>
          <ThemeToggler/>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
