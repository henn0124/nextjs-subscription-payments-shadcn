import { ReactNode } from 'react';
import { RoleProtectedRoute } from '@/components/RoleProtectedRoute';
import Sidebar from '@/components/Sidebar';

export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProtectedRoute allowedRoles={['free_user', 'paid_user', 'admin']}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </RoleProtectedRoute>
  );
}
