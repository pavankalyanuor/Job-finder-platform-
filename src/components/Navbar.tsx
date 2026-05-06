import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface NavbarProps {
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ savedCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative p-2 font-medium md:hover:bg-transparent ${
      isActive ? 'text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
    }`;

  return (
    <header className="sticky top-0 z-[100] bg-white shadow-sm">
      <div className="mx-auto flex h-[70px] w-full max-w-[1200px] items-center justify-between px-6">
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/" className="flex items-center gap-2">
            <i className="fa-solid fa-briefcase"></i> JobFinder
          </Link>
        </div>
        
        <button 
          className="block text-2xl text-gray-700 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <nav 
          className={`
            absolute left-0 top-[70px] right-0 bg-white p-4 shadow-md md:static md:flex md:gap-6 md:p-0 md:shadow-none
            ${isMobileMenuOpen ? 'flex flex-col gap-2' : 'hidden'}
          `}
        >
          <NavLink to="/" className={getLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/search" className={getLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Search Jobs</NavLink>
          <NavLink to="/saved" className={getLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
            Saved Jobs <span className="ml-1 rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">{savedCount}</span>
          </NavLink>
          <NavLink to="/about" className={getLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={getLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
};
