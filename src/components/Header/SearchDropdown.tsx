import React from 'react';
import { applications } from '../../data/applications';

interface SearchDropdownProps {
  searchTerm: string;
  onSelect: (appName: string) => void;
}

export function SearchDropdown({ searchTerm, onSelect }: SearchDropdownProps) {
  if (!searchTerm) return null;

  const filteredApps = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredApps.length === 0) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-md shadow-lg py-1 z-50">
      {filteredApps.map((app) => (
        <div
          key={app.id}
          className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
          onClick={() => onSelect(app.name)}
        >
          <div className={`p-2 rounded-md ${app.color} text-white`}>
            <app.icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{app.name}</p>
            <p className="text-xs text-gray-500">{app.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}