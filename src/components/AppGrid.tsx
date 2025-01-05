import React from 'react';
import { Link } from 'react-router-dom';
import { applications } from '../data/applications';
import { useLanguage } from '../contexts/LanguageContext';

export function AppGrid() {
  const { t } = useLanguage();

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">{t('app.myApplications')}</h1>
          <p className="mt-1 text-sm text-gray-500">{t('app.accessSap')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <Link
              key={app.id}
              to={app.path}
              className="relative group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#0070f2] hover:shadow-md transition-all duration-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${app.color} text-white mb-4`}>
                <app.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#0070f2]">
                {t(app.nameKey)}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{t(app.descriptionKey)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}