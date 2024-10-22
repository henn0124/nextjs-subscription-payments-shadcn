'use client';

import { useUserRole } from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { role, loading } = useUserRole();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role !== 'admin') {
    router.push('/unauthorized');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage users and subscriptions.</p>
      {/* Add admin-specific features and components */}
    </div>
  );
}
