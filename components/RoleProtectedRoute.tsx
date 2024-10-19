import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { role, loading } = useUserRole();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role === null || !allowedRoles.includes(role)) {
    router.push('/unauthorized');
    return null;
  }

  return <>{children}</>;
}
