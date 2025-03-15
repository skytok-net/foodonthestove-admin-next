// app/providers.tsx
'use client';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { ApolloWrapper } from './apollo-wrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </SessionProvider>
    </ThemeProvider>
  );
}
