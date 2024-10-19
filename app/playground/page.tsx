'use client';

import { RoleProtectedRoute } from '@/components/RoleProtectedRoute';

export default function Playground() {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'paid_user', 'free_user']}>
      <div>
        <h1>Playground</h1>
        <p>This is the main authenticated area for all users.</p>
      </div>
    </RoleProtectedRoute>
  );
}
