import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden dark:text-slate-100  text-slate-800 py-6 px-4 md:px-8 flex flex-col items-center gap-6">
      {/* Navigation Links */}
      <nav className="flex flex-wrap gap-6 text-lg font-medium">
        <a
          href="#home"
          className="hover:text-gray-400 transition-all duration-300"
        >
          Home
        </a>
        <a
          href="#testimonials"
          className="hover:text-gray-400 transition-all duration-300"
        >
          Testimonials
        </a>
        <a
          href="#contact"
          className="hover:text-gray-400 transition-all duration-300"
        >
          Contact
        </a>
        <a
          href="#about"
          className="hover:text-gray-400 transition-all duration-300"
        >
          About
        </a>
      </nav>

      {/* Social Media Links */}
      <div className="flex gap-6 text-xl">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-transform duration-300 transform hover:scale-110"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-transform duration-300 transform hover:scale-110"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500 transition-transform duration-300 transform hover:scale-110"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition-transform duration-300 transform hover:scale-110"
        >
          <FaXTwitter />
        </a>
      </div>

      {/* Copyright Text */}
      <p className="text-sm text-gray-400 text-center leading-relaxed">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-slate-300">ACES</span>. All rights
        reserved.
        <br />
        <a
          href="mailto:acesnitjsr@gmail.com"
          className="text-blue-400 hover:text-blue-500 transition-all duration-300"
        >
          acesnitjsr@gmail.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
