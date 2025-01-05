import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SearchDropdown } from './SearchDropdown';
import { useNavigate } from 'react-router-dom';
import { applications } from '../../data/applications';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (appName: string) => {
    const app = applications.find(a => a.name === appName);
    if (app) {
      navigate(app.path);
    }
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50">
      <div className="flex items-center bg-white rounded-md border border-gray-300 focus-within:border-[#0070f2] focus-within:ring-1 focus-within:ring-[#0070f2]">
        <Search className="h-5 w-5 text-gray-400 ml-3" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 py-2 px-3 text-sm focus:outline-none"
          placeholder="Search applications..."
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="p-1 hover:text-gray-600"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
      <SearchDropdown searchTerm={searchTerm} onSelect={handleSelect} />
    </div>
  );
}