import React from 'react';
import { Cloud, Shield, Zap, Globe } from 'lucide-react';

export function Features() {
  const features = [
    {
      name: 'Cloud Infrastructure',
      description: 'Enterprise-grade infrastructure designed for performance and reliability.',
      icon: Cloud,
    },
    {
      name: 'Advanced Security',
      description: 'Built-in security features to protect your business data.',
      icon: Shield,
    },
    {
      name: 'Fast Development',
      description: 'Accelerate your development with modern tools and frameworks.',
      icon: Zap,
    },
    {
      name: 'Global Scale',
      description: 'Deploy your applications worldwide with our global network.',
      icon: Globe,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Enterprise Solutions for Every Need
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive cloud solutions designed for modern businesses
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-300">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#0070f2] text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}