import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-gray-900 text-gray-400 pt-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <h3 className="mb-5 text-xl font-bold text-white">JobFinder</h3>
            <p className="max-w-md">Find your dream job with ease using the power of Adzuna's job search API. Rebuilt smoothly with React.</p>
          </div>
          <div>
            <h4 className="mb-5 font-bold text-white uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/search" className="hover:text-white transition">Search Jobs</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 font-bold text-white uppercase tracking-wider text-sm">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 py-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} JobFinder React. Powered by Adzuna.</p>
        </div>
      </div>
    </footer>
  );
};
