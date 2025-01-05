import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, LogOut, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { SettingsDropdown } from './SettingsDropdown';
import { useLanguage } from '../../contexts/LanguageContext';

const SBD_LOGO_URL = 'https://ntfb.org/wp-content/uploads/2021/10/Stanley-Black-Decker-logo.png';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  if (!user) return null;

  return (
    <header className="bg-white border-b border-gray-200 relative z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <img 
                src={SBD_LOGO_URL}
                alt="Stanley Black & Decker Logo" 
                className="h-8"
              />
            </Link>
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-[#0070f2] transition-colors"
            >
              <Home className="h-5 w-5 mr-1" />
              <span className="text-sm">{t('nav.home')}</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1 hover:text-[#0070f2] focus:outline-none"
              >
                <Search className="h-5 w-5 text-gray-500" />
              </button>
              <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            </div>
            <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#0070f2]" />
            <SettingsDropdown />
            <button
              onClick={handleSignOut}
              className="flex items-center text-gray-500 hover:text-[#0070f2]"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}