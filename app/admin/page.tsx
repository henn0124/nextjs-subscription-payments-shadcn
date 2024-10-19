'use client';

import { RoleProtectedRoute } from '@/components/RoleProtectedRoute';

export default function AdminDashboard() {
  return (
    <RoleProtectedRoute allowedRoles={['admin']}>
      <div>
        <h1>Admin Dashboard</h1>
        <p>This area is only accessible to administrators.</p>
      </div>
    </RoleProtectedRoute>
  );
}
