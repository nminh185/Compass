import React, { useEffect } from 'react';
import { useProductionStore } from '../store/productionStore';
import { useNavigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { exportToExcel } from '../utils/excelExport';
import { useLanguage } from '../contexts/LanguageContext';

export function ProductionList() {
  const navigate = useNavigate();
  const { orders, fetchOrders, error, isLoading } = useProductionStore();
  const { t } = useLanguage();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleExport = async () => {
    try {
      const headers = {
        'production.orderNumber': t('production.orderNumber'),
        'production.location': t('production.location'),
        'production.employeeId': t('production.employeeId'),
        'production.timestamp': t('production.timestamp')
      };

      await exportToExcel(
        headers,
        `production-orders-${new Date().toISOString().split('T')[0]}`
      );
    } catch (error) {
      console.error('Export failed:', error);
      // You might want to show an error message to the user here
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{t('list.title')}</h2>
            <p className="mt-1 text-sm text-gray-500">{t('list.subtitle')}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070f2]"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('list.export')}
            </button>
            <button
              onClick={() => navigate('/production-entry')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0070f2] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070f2]"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('list.newOrder')}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="px-4 py-3 bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('production.orderNumber')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('production.location')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('production.employeeId')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('production.timestamp')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      {t('list.noOrders')}
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.order_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.employee_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}