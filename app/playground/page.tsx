import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import PlaygroundClient from './PlaygroundClient';

export default async function Playground() {
  const supabase = createClient();
  const user = await getUser(supabase);

  return <PlaygroundClient userEmail={user?.email ?? 'Guest'} />;
}
