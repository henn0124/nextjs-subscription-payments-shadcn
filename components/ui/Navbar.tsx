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
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              {role && <Link href="/playground">Playground</Link>}
              {role === 'admin' && <Link href="/admin-dashboard">Admin Dashboard</Link>}
              {!role && (
                <>
                  <Link href="/signin?mode=signup" className="text-white hover:text-gray-300">Sign Up</Link>
                  <Link href="/signin" className="text-white hover:text-gray-300">Sign In</Link>
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
