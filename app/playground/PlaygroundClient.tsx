'use client';

import ClientButton from '@/components/ClientButton';

interface PlaygroundClientProps {
  userEmail: string;
}

export default function PlaygroundClient({ userEmail }: PlaygroundClientProps) {
  const isGuest = userEmail === 'Guest';

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome to the Playground</h1>
      <p className="mb-4">
        Hello, {isGuest ? 'Guest' : userEmail}! This is the playground area.
      </p>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">What you can do here:</h2>
        <ul className="list-disc list-inside">
          <li>Explore our features</li>
          <li>Try out our tools</li>
          {!isGuest && <li>Access your personalized content</li>}
        </ul>
      </div>
      {isGuest ? (
        <p className="mt-4">
          Sign in to access more features and personalized content!
        </p>
      ) : (
        <ClientButton onClick={() => console.log('Button clicked')}>
          Access Premium Features
        </ClientButton>
      )}
    </div>
  );
}
