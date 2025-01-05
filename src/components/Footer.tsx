import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; 2024 SAP SE or an SAP affiliate company. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link 
              to="/privacy" 
              className="text-sm text-gray-500 hover:text-[#0070f2] transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-gray-500 hover:text-[#0070f2] transition-colors duration-200"
            >
              Terms of Use
            </Link>
            <Link 
              to="/legal" 
              className="text-sm text-gray-500 hover:text-[#0070f2] transition-colors duration-200"
            >
              Legal Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}