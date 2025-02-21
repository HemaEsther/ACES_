import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scrolling to update header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scrolling function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // Close mobile menu
    }
  };

  return (
    <div
      className={`fixed top-0 z-50 w-full h-14 flex items-center px-6 justify-between transition-all duration-300 font-serif ${
        isScrolled
          ? "bg-slate-50 dark:bg-black shadow-md"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      {/* Logo */}
      <a
        className="text-bold text-3xl text-slate-800 dark:text-slate-200 cursor-pointer"
        onClick={() => scrollToSection("home")}
      >
        ACES
      </a>

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
          {/* <li>
            <button
              href="#home"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              href="#about"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
          </li>
          <li>
            <button
              href="#faq"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
              onClick={() => scrollToSection("faq")}
            >
              FAQ
            </button>
          </li>
          <li>
            <button
              href="#testimonials"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
              onClick={() => scrollToSection("testimonials")}
            >
              Testimonials
            </button>
          </li>
          <li>
            <button
              href="#contact"
              className="hover:text-gray-600 dark:hover:text-gray-400 transition"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>
          </li> */}
          <ThemeToggle />
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-black p-4 md:hidden shadow-lg transition-colors">
          <ul className="flex flex-col space-y-4 text-lg text-black dark:text-white">
            {/* <li>
              <a
                href="#home"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => scrollToSection("home")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => scrollToSection("about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => scrollToSection("faq")}
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => scrollToSection("testimonials")}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-gray-600 dark:hover:text-gray-400 transition"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </a>
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

export default Header;
