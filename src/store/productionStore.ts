import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import { processBulkOrders } from '../utils/bulkOperations';

type ProductionOrder = Database['public']['Tables']['production_orders']['Row'];

interface ProductionStore {
  orders: ProductionOrder[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: { orderNumber: string; location: string; employeeId: string }) => Promise<void>;
  addBulkOrders: (orders: { orderNumber: string; location: string; employeeId: string }[]) => Promise<{ updated: number; inserted: number }>;
  deleteOrders: (orderNumbers: string[]) => Promise<void>;
}

export const useProductionStore = create<ProductionStore>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('production_orders')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      set({ orders: data || [] });
    } catch (error) {
      console.error('Error fetching orders:', error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addOrder: async (order) => {
    set({ isLoading: true, error: null });
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!userData.user) throw new Error('Not authenticated');

      const { error } = await supabase.from('production_orders').upsert({
        order_number: order.orderNumber,
        location: order.location,
        employee_id: order.employeeId,
        user_id: userData.user.id,
        timestamp: new Date().toISOString(),
      }, { onConflict: 'order_number' });

      if (error) throw error;
      await get().fetchOrders();
    } catch (error) {
      console.error('Error adding/updating order:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addBulkOrders: async (orders) => {
    set({ isLoading: true, error: null });
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!userData.user) throw new Error('Not authenticated');

      const results = await processBulkOrders(supabase, orders, userData.user.id);
      
      if (results.errors.length > 0) {
        throw new Error(results.errors.join(', '));
      }

      await get().fetchOrders();
      return { updated: results.updated, inserted: results.inserted };
    } catch (error) {
      console.error('Error in bulk operation:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteOrders: async (orderNumbers) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('production_orders')
        .delete()
        .in('order_number', orderNumbers);

      if (error) throw error;
      await get().fetchOrders();
    } catch (error) {
      console.error('Error deleting orders:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to delete orders' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));