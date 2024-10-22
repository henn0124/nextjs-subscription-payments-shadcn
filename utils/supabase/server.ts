import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types_db';
import { CookieOptions } from '@supabase/ssr'

// Define a function to create a Supabase client for server-side operations
// The function takes a cookie store created with next/headers cookies as an argument
export const createClient = (cookieStore: CookieOptions['cookies']) => {
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
};
