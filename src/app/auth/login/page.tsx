'use client';

import { LoginForm } from '@/components/auth/login-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
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
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
