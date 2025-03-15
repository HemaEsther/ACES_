import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import Logout from "./Logout";

const HeaderDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full h-14 flex items-center px-6 justify-between transition-all duration-300 font-serif ${
        isScrolled ? "bg-slate-50 dark:bg-black shadow-md" : "bg-transparent dark:bg-transparent"
      }`}
    >
      <Link to="/">
        <p className="text-bold text-3xl text-slate-800 dark:text-slate-200">ACES</p>
      </Link>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-black dark:text-white w-8 h-8" /> : <Menu className="text-black dark:text-white w-8 h-8" />}
        </button>
      </div>

      <nav className="hidden md:flex items-center space-x-6 text-lg text-black dark:text-white">
        <Logout />
        <ThemeToggle />
      </nav>

      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-black p-4 md:hidden shadow-lg">
          <ul className="flex flex-col space-y-4 text-lg text-black dark:text-white">
            <li><Logout /></li>
            <li><ThemeToggle /></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderDashboard;