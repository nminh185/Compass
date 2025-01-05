import React from 'react';
import { Search, Bell, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-4">
              <img 
                src="https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg" 
                alt="SAP Logo" 
                className="h-8"
              />
              <span className="text-sm text-gray-600 hover:text-[#0070f2]">Home</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Search className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#0070f2]" />
            <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#0070f2]" />
            <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#0070f2]" />
            <User className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#0070f2]" />
          </div>
        </div>
      </div>
    </header>
  );
}