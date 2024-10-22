import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types_db'

export const createClient = () =>
  createServerActionClient<Database>({ cookies })
