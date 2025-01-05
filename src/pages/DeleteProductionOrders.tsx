import React, { useState } from 'react';
import { useProductionStore } from '../store/productionStore';
import { Trash2, AlertCircle } from 'lucide-react';
import { SuccessModal } from '../components/SuccessModal';
import { useUserRole } from '../hooks/useUserRole';
import { useLanguage } from '../contexts/LanguageContext';

export function DeleteProductionOrders() {
  const [orderNumbers, setOrderNumbers] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const deleteOrders = useProductionStore((state) => state.deleteOrders);
  const { isAdmin, loading } = useUserRole();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">{t('common.loading')}</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {t('delete.noPermission')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    const orders = orderNumbers
      .split('\n')
      .map(order => order.trim())
      .filter(order => order.length > 0);

    if (orders.length === 0) {
      setError(t('delete.noOrders'));
      return;
    }

    try {
      if (confirm(t('delete.confirmDelete').replace('{count}', orders.length.toString()))) {
        await deleteOrders(orders);
        setDeleteCount(orders.length);
        setShowSuccessModal(true);
        setOrderNumbers('');
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('delete.error'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Trash2 className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-900">{t('delete.title')}</h2>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('delete.pasteOrders')}
            </label>
            <textarea
              value={orderNumbers}
              onChange={(e) => setOrderNumbers(e.target.value)}
              className="w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#0070f2] focus:ring-[#0070f2] sm:text-sm"
              placeholder={t('delete.ordersPlaceholder')}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('delete.button')}
            </button>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        message={t('delete.success').replace('{count}', deleteCount.toString())}
      />
    </div>
  );
}