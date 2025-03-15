'use client';

import { useEffect, useState } from 'react';
import MainLayout from './main-layout';
import {Providers} from '@/components/providers/providers';
import { Loader2 } from 'lucide-react';

export default function ClientMainLayout({ children }: { children: React.ReactNode }) {
  const [error] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Client-side only code
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">Something went wrong</h2>
          <p className="mb-4 text-muted-foreground">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Initializing layout...</p>
      </div>
    );
  }

  return (
    <Providers>
      <MainLayout>{children}</MainLayout>
    </Providers>
  );
}
