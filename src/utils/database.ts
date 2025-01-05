import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type ProductionOrder = Database['public']['Tables']['production_orders']['Row'];

const PAGE_SIZE = 1000;

export async function fetchAllOrders(): Promise<ProductionOrder[]> {
  const allOrders: ProductionOrder[] = [];
  let lastId: string | null = null;
  
  while (true) {
    const query = supabase
      .from('production_orders')
      .select('*')
      .order('id', { ascending: true })
      .limit(PAGE_SIZE);

    if (lastId) {
      query.gt('id', lastId);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    if (!data || data.length === 0) break;
    
    allOrders.push(...data);
    lastId = data[data.length - 1].id;
    
    if (data.length < PAGE_SIZE) break;
  }

  return allOrders;
}