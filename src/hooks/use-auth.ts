'use client';

import { useEffect, useState } from 'react';
import { auth, signIn, signOut } from '@/auth';
import { useSession } from 'next-auth/react';
import { AtpUser } from '@/types/atprotocol';

export interface UseAuthReturn {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: Partial<AtpUser> | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Partial<AtpUser> | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const session = await auth();
        setUser(session?.user as Partial<AtpUser> || null);
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Update user when session changes
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser(session.user as Partial<AtpUser>);
      setIsLoading(false);
    } else if (status === 'unauthenticated') {
      setUser(null);
      setIsLoading(false);
    }
  }, [session, status]);

  const login = async () => {
    try {
      await signIn('atproto');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return {
    isLoggedIn: !!user,
    isLoading,
    user,
    login,
    logout,
  };
}
