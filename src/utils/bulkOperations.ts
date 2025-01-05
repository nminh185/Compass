import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../lib/database.types';
import { useProgressStore } from '../store/progressStore';

type BulkOrder = {
  orderNumber: string;
  location: string;
  employeeId: string;
};

const BATCH_SIZE = 500; // Reduced batch size for better performance

export async function processBulkOrders(
  supabase: SupabaseClient<Database>,
  orders: BulkOrder[],
  userId: string
) {
  const { setProgress } = useProgressStore.getState();
  let totalProcessed = 0;
  let totalUpdated = 0;
  let totalInserted = 0;
  const errors: string[] = [];

  // Split orders into batches
  const batches = [];
  for (let i = 0; i < orders.length; i += BATCH_SIZE) {
    batches.push(orders.slice(i, i + BATCH_SIZE));
  }

  setProgress(0, orders.length);

  for (const batch of batches) {
    try {
      const { data, error } = await supabase.rpc('bulk_update_orders', {
        _orders: batch,
        _user_id: userId
      });

      if (error) throw error;

      if (data) {
        totalUpdated += data.updated || 0;
        totalInserted += data.inserted || 0;
      }

      totalProcessed += batch.length;
      setProgress(totalProcessed, orders.length);

      // Small delay between batches to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      console.error('Batch processing error:', error);
      errors.push(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  return {
    updated: totalUpdated,
    inserted: totalInserted,
    errors: errors.length > 0 ? errors : []
  };
}