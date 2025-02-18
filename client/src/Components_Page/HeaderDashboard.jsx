import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import ThemeToggle from "../components/ThemeToggle";
import Logout from "./Logout";

const HeaderDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scrolling to update header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`border fixed top-0 z-50 w-screen h-14 flex items-center px-6 justify-between transition-all duration-300 font-serif ${
        isScrolled
          ? "bg-slate-50 dark:bg-black shadow-md"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      {/* Clickable logo */}
      <Link to="/">
        {/* <img src={cvlogo} alt="Logo" className="w-20 cursor-pointer" /> */}
        <p className="  text-bold text-3xl text-slate-800 dark:text-slate-200">ACES</p>
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="text-black dark:text-white w-8 h-8" />
          ) : (
            <Menu className="text-black dark:text-white w-8 h-8" />
          )}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex justify-center items-center space-x-6 text-lg text-black dark:text-white">
           <li><Logout /></li> 
          {/* <li>
            <Link
              to="/"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/testimonials"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
            >
              Contact
            </Link>
          </li> */}
          <ThemeToggle />
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-black p-4 md:hidden shadow-lg transition-colors">
          <ul className="flex flex-col space-y-4 text-lg text-black dark:text-white">
            {/* <li>
              <Link
                to="/"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/testimonials"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li> */}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderDashboard;
