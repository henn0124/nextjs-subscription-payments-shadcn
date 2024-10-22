'use client';

import { useUserRole } from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';

export default function Playground() {
  const { role, loading } = useUserRole();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    router.push('/signin');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Playground</h1>
      <p>Welcome to the main authenticated area. Your role is: {role}</p>
      {/* Add more content and features for authenticated users */}
    </div>
  );
}
