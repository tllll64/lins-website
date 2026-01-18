import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-ds-cararra/90 backdrop-blur-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-end gap-12 font-ds-sans text-sm font-medium text-ds-cod tracking-wide">
                <Link to="/" className="hover:text-ds-dusty transition-colors">Works</Link>
                <a href="/#explorations" className="hover:text-ds-dusty transition-colors">Explorations</a>
                <Link to="/about" className="hover:text-ds-dusty transition-colors">About</Link>
                <a href="#" className="hover:text-ds-dusty transition-colors">Resume</a>
            </div>
        </nav>
    );
};
