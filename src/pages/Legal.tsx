import React from 'react';

export function Legal() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Legal Disclosure</h1>
        <div className="prose prose-blue">
          <p className="text-gray-600 mb-4">
            This legal disclosure provides information about our company and the legal aspects of using our application.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Company Information</h2>
          <p className="text-gray-600 mb-4">
            [Company Name]<br />
            [Address]<br />
            [Contact Information]
          </p>
          {/* Add more legal disclosure content as needed */}
        </div>
      </div>
    </div>
  );
}