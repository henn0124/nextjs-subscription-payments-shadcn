'use client';

import { Button } from '@/components/ui/button';

interface ClientButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function ClientButton({ onClick, children }: ClientButtonProps) {
  return (
    <Button onClick={onClick}>{children}</Button>
  );
}
