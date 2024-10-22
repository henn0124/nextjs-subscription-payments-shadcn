import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface GoogleSignInButtonProps {
  onClick: () => Promise<void>;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick }) => {
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setError(null);
      await onClick();
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
      >
        <Image
          src="/google-logo.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2"
        />
        Sign in with Google
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default GoogleSignInButton;
