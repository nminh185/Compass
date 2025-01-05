import React from 'react';

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-blue">
          <p className="text-gray-600 mb-4">
            This Privacy Policy describes how your personal information is collected, used, and shared when you use our application.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, including production order details, location information, and employee IDs.
          </p>
          {/* Add more privacy policy content as needed */}
        </div>
      </div>
    </div>
  );
}