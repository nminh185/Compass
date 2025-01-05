import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useUserRole() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserRole() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Check role from raw_user_meta_data
        const userRole = user.user_metadata?.role;
        setIsAdmin(userRole === 'admin');
      } catch (error) {
        console.error('Error checking user role:', error);
      } finally {
        setLoading(false);
      }
    }

    checkUserRole();
  }, []);

  return { isAdmin, loading };
}