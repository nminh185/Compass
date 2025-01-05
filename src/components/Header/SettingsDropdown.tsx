import React, { useRef, useState } from 'react';
import { Settings, Globe, Lock } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useLanguage } from '../../contexts/LanguageContext';

export function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-500 hover:text-[#0070f2] transition-colors"
      >
        <Settings className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div className="p-2">
            <button
              onClick={() => {
                setShowPasswordModal(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Lock className="h-4 w-4 mr-3 text-gray-500" />
              {t('settings.changePassword')}
            </button>
          </div>
          
          <div className="p-2">
            <div className="px-3 py-2">
              <div className="flex items-center text-sm font-medium text-gray-700">
                <Globe className="h-4 w-4 mr-3 text-gray-500" />
                {t('settings.language')}
              </div>
              <div className="mt-2 ml-7 space-y-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors ${
                    language === 'en' 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('settings.english')}
                  {language === 'en' && (
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </button>
                <button
                  onClick={() => setLanguage('vn')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors ${
                    language === 'vn' 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('settings.vietnamese')}
                  {language === 'vn' && (
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}