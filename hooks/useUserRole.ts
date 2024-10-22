'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase.rpc('get_user_role', { user_uuid: user.id });
        if (error) {
          console.error('Error fetching user role:', error);
        } else {
          setRole(data);
        }
      }
      
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  return { role, loading };
}
