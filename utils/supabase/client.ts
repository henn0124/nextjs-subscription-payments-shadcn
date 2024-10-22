import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types_db';

// Define a function to create a Supabase client for client-side operations
export const createClient = () => {
  return createClientComponentClient<Database>();
};
