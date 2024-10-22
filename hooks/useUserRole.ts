'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const getUserRole = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (session?.user) {
        const { data, error } = await supabase.rpc('get_user_role', { user_uuid: session.user.id });
        if (error) throw error;
        setRole(data);
      } else {
        setRole(null);
      }
    } catch (error) {
      console.error('Error in getUserRole:', error);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getUserRole();
  }, [getUserRole]);

  return { role, loading };
}
