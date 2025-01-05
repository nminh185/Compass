import React from 'react';

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Use</h1>
        <div className="prose prose-blue">
          <p className="text-gray-600 mb-4">
            By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Use License</h2>
          <p className="text-gray-600 mb-4">
            Permission is granted to temporarily use this application for personal, non-commercial transitory viewing only.
          </p>
          {/* Add more terms of use content as needed */}
        </div>
      </div>
    </div>
  );
}