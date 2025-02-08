import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import cvlogo from "../assets/cvlogo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 z-50 bg-black w-screen h-14 flex items-center px-6 justify-between">
      {/* Clickable logo */}
      <Link to="/">
        <img src={cvlogo} alt="Logo" className="w-20 cursor-pointer" />
      </Link>

      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white w-8 h-8" /> : <Menu className="text-white w-8 h-8" />}
        </button>
      </div>

      {/* Desktop View */}
      <nav className="hidden md:block">
        <ul className="flex space-x-6 text-white text-lg">
          <li>
            <Link to="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">About</Link>
          </li>
          <li>
            <Link to="/testimonials" className="hover:text-gray-400">Testimonials</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          </li>
        </ul>

      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-black p-4 md:hidden">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <li>
              <Link to="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="/testimonials" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Testimonials</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
