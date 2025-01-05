import React, { useState, useEffect } from 'react';
import { useProductionStore } from '../store/productionStore';
import { Clipboard, Save } from 'lucide-react';
import { SuccessModal } from '../components/SuccessModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgressStore } from '../store/progressStore';
import { ProgressBar } from '../components/ProgressBar';

export function MassProductionEntry() {
  const [orderNumbers, setOrderNumbers] = useState('');
  const [location, setLocation] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [processingSummary, setProcessingSummary] = useState<{ updated: number; inserted: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addBulkOrders } = useProductionStore();
  const { t } = useLanguage();
  const { current, total, isProcessing, startProcessing, endProcessing, reset } = useProgressStore();

  useEffect(() => {
    return () => reset(); // Cleanup on unmount
  }, [reset]);

  const handleSubmit = async () => {
    try {
      setError(null);
      if (!location || !employeeId || !orderNumbers.trim()) {
        setError(t('production.fillAllFields'));
        return;
      }

      const orders = orderNumbers
        .split('\n')
        .map(order => order.trim())
        .filter(order => order.length > 0)
        .map(orderNumber => ({
          orderNumber,
          location,
          employeeId,
        }));

      if (orders.length === 0) {
        setError(t('production.noOrders'));
        return;
      }

      startProcessing();
      const results = await addBulkOrders(orders);
      setProcessingSummary(results);
      setShowSuccessModal(true);
      setOrderNumbers('');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      endProcessing();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Clipboard className="h-6 w-6 text-[#0070f2]" />
          <h2 className="text-2xl font-semibold text-gray-900">{t('app.massUpdate')}</h2>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            {error}
          </div>
        )}

        {isProcessing && (
          <div className="mb-6">
            <ProgressBar current={current} total={total} />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('production.pasteOrders')}
            </label>
            <textarea
              value={orderNumbers}
              onChange={(e) => setOrderNumbers(e.target.value)}
              disabled={isProcessing}
              className="w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#0070f2] focus:ring-[#0070f2] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder={t('production.orderNumbersPlaceholder')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('production.location')}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isProcessing}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#0070f2] focus:ring-[#0070f2] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={t('production.locationPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('production.employeeId')}
              </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                disabled={isProcessing}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#0070f2] focus:ring-[#0070f2] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={t('production.employeeIdPlaceholder')}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0070f2] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {isProcessing ? t('common.processing') : t('production.updateAll')}
            </button>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false);
          setProcessingSummary(null);
        }}
        message={
          processingSummary
            ? t('production.bulkUpdateSuccess')
                .replace('{updated}', processingSummary.updated.toString())
                .replace('{inserted}', processingSummary.inserted.toString())
            : t('common.success')
        }
      />
    </div>
  );
}