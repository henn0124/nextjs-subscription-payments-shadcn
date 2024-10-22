'use client';

import React, { useEffect, useState } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { role, loading } = useUserRole();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!role || !allowedRoles.includes(role)) {
        router.push('/unauthorized');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [role, loading, allowedRoles, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <>{children}</> : null;
};
