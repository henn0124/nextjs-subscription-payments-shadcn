'use client';

import Link from 'next/link';
import { useUserRole } from '@/hooks/useUserRole';

export default function Navbar() {
  const { role, loading } = useUserRole();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Your App Name
        </Link>
        <div className="space-x-4">
          <Link href="/playground">Playground</Link>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              {role === 'admin' && <Link href="/admin-dashboard">Admin Dashboard</Link>}
              {!role && (
                <>
                  <Link href="/signin">Sign In</Link>
                  <Link href="/signin?mode=signup">Sign Up</Link>
                </>
              )}
              {role && <Link href="/signout">Sign Out</Link>}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
