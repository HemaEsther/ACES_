import React from 'react';

const Footer = () => {
    return (
        <div className='overflow-hidden b dark:bg-black  dark:text-slate-200 flex justify-around'>
            {/* Navigation Links */}
            <div className="flex gap-4 mt-4 md:mt-0">

                <nav className="flex flex-wrap gap-6">
                    <a href="#home" className="hover:text-gray-400">Home</a>
                    <a href="#testimonials" className="hover:text-gray-400">Testimonials</a>
                    <a href="#contact" className="hover:text-gray-400">Contact</a>
                    <a href="#about" className="hover:text-gray-400">About</a>
                </nav>

                {/* Social Media Links */}

                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    Instagram
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    Linkedin
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    X
                </a>
            </div>
        </div>
    );
};

export default Footer;