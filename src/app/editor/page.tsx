'use client';

import { Suspense, useState, useEffect } from 'react';
import { Toaster } from 'sonner';

import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  // Only mount the editor component on the client side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="h-screen w-full" data-registry="plate">
      <ErrorBoundary fallback={<div className="p-4">An error occurred in the editor. Please refresh the page.</div>}>
        <SettingsProvider>
          <Suspense fallback={<div className="p-4">Loading editor...</div>}>
            {mounted && <PlateEditor />}
          </Suspense>
        </SettingsProvider>
      </ErrorBoundary>

      <Toaster />
    </div>
  );
}
