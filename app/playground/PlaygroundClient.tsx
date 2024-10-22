'use client';

import ClientButton from '@/components/ClientButton';

interface PlaygroundClientProps {
  userEmail: string;
}

export default function PlaygroundClient({ userEmail }: PlaygroundClientProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome to the Playground</h1>
      <p className="mb-4">Hello, {userEmail}! This is your playground area.</p>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">What you can do here:</h2>
        <ul className="list-disc list-inside">
          <li>Explore your account settings</li>
          <li>Access premium features (for paid users)</li>
          <li>Get help and support</li>
        </ul>
      </div>
      <ClientButton onClick={() => console.log('Button clicked')}>
        Click me
      </ClientButton>
    </div>
  );
}
