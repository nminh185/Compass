import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductionStore } from '../store/productionStore';
import { useNavigate } from 'react-router-dom';
import { SuccessModal } from '../components/SuccessModal';
import { useLanguage } from '../contexts/LanguageContext';

const schema = z.object({
  orderNumber: z.string().min(1, 'Production Order is required'),
  location: z.string().min(1, 'Location is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
});

type FormData = z.infer<typeof schema>;

export function ProductionEntry() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addOrder } = useProductionStore();
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      await addOrder(data);
      reset();
      setShowSuccessModal(true);
      setIsUpdate(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(t('common.error'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('production.orderEntry')}
        </h2>
        
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
              {t('production.orderNumber')}
            </label>
            <input
              {...register('orderNumber')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0070f2] focus:ring-[#0070f2] sm:text-sm"
              placeholder={t('production.orderNumberPlaceholder')}
            />
            {errors.orderNumber && (
              <p className="mt-1 text-sm text-red-600">{t('production.orderRequired')}</p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              {t('production.location')}
            </label>
            <input
              {...register('location')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0070f2] focus:ring-[#0070f2] sm:text-sm"
              placeholder={t('production.locationPlaceholder')}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{t('production.locationRequired')}</p>
            )}
          </div>

          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
              {t('production.employeeId')}
            </label>
            <input
              {...register('employeeId')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0070f2] focus:ring-[#0070f2] sm:text-sm"
              placeholder={t('production.employeeIdPlaceholder')}
            />
            {errors.employeeId && (
              <p className="mt-1 text-sm text-red-600">{t('production.employeeIdRequired')}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {t('production.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0070f2] hover:bg-blue-700"
            >
              {t('production.save')}
            </button>
          </div>
        </form>
      </div>
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        message={t('common.success')}
      />
    </div>
  );
}