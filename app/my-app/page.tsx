import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import MyAppClient from './MyAppClient';
import { redirect } from 'next/navigation';

export default async function MyApp() {
  console.log('MyApp page component rendered');
  
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  console.log('Server-side user data:', user);
  if (error) console.error('Error fetching user:', error);

  if (!user) {
    console.log('No user found on server-side, redirecting to /signin');
    redirect('/signin');
  }

  return <MyAppClient userEmail={user.email ?? 'Unknown'} />;
}
