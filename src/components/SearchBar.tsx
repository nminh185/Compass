import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const applications = [
    {
      name: 'Update Production Orders Location',
      path: '/production-entry',
      keywords: ['production', 'order', 'update', 'location', 'entry'],
    },
    {
      name: 'Display Location of Production Orders',
      path: '/production-list',
      keywords: ['production', 'order', 'display', 'location', 'list', 'view'],
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const matchedApp = applications.find(app => 
        app.name.toLowerCase().includes(searchTermLower) ||
        app.keywords.some(keyword => keyword.includes(searchTermLower))
      );

      if (matchedApp) {
        navigate(matchedApp.path);
        setSearchTerm('');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0070f2] focus:border-[#0070f2] sm:text-sm transition-colors duration-200"
          placeholder="Search applications (Press Enter to navigate)..."
        />
      </div>
    </div>
  );
}