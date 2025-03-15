'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import Link from 'next/link';

function ErrorContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Get error message from URL query parameter
    const errorMessage = searchParams.get('error');
    setError(errorMessage);
  }, [searchParams]);
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="Food on the Stove Logo"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </div>
        <CardTitle className="text-xl font-semibold">Authentication Error</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'An unexpected authentication error occurred.'}
          </AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Please try again or contact support if the problem persists.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
        <Button asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Suspense fallback={
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Food on the Stove Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </div>
            <CardTitle className="text-xl font-semibold">Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Please wait while we process your request.
            </p>
          </CardContent>
        </Card>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
