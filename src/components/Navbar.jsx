import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from '../assets/nipexlogo.png';
import { FaXTwitter } from 'react-icons/fa6';

const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between bg-black bg-opacity-80 py-3 px-6 text-amber-300">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
                <a href="/" aria-label='Home'>
                    <img src={logo} className="mx-10 h-18 w-20" width={50} height={33} alt="logo"/>
                </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 text-2xl">
                <a href="https://www.linkedin.com/in/adebayo-oseni" 
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="LinkedIn">
                    <FaLinkedin />
                </a>

                <a href="https://github.com/nipexhere" 
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="GitHub">
                    <FaGithub />
                </a>

                <a href="https://www.instagram.com/nipexfvr" 
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Instagram">
                    <FaInstagram />
                </a>

                <a href="https://twitter.com/fakenipex" 
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Twitter">
                    <FaXTwitter />
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
