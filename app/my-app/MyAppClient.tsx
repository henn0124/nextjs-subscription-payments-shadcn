'use client';

import { useEffect } from 'react';

interface MyAppClientProps {
  userEmail: string;
}

export default function MyAppClient({ userEmail }: MyAppClientProps) {
  console.log('MyAppClient component rendered');

  useEffect(() => {
    console.log('MyAppClient useEffect triggered');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl mb-4">Hello, {userEmail}!</p>
        <p>This is a protected route. Only authenticated users can see this page.</p>
      </main>
    </div>
  );
}
