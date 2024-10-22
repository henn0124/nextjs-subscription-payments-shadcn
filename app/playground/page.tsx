import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import PlaygroundClient from './PlaygroundClient';

export default async function Playground() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getUser(supabase);

  return <PlaygroundClient userEmail={user?.email ?? 'Guest'} />;
}
