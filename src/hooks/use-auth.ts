'use client';

import { useEffect, useState } from 'react';
import { signIn, signOut } from '@/auth';
import { useSession } from 'next-auth/react';
import { AtpUser } from '@/types/atprotocol';

export interface UseAuthReturn {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: Partial<AtpUser> | null;
  isAdmin: boolean;
  profile: { displayName?: string; avatar?: string } | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Partial<AtpUser> | null>(null);
  const [profile, setProfile] = useState<{ displayName?: string; avatar?: string } | null>(null);

  // Handle initial auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (status === 'loading') {
          return; // Wait for useSession to complete
        }
        
        setIsLoading(true);
        
        if (status === 'authenticated' && session?.user) {
          const userData = session.user as Partial<AtpUser>;
          setUser(userData);
          
          // Extract profile data
          setProfile({
            displayName: userData.name || userData.handle,
            avatar: userData.image || undefined
          });
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
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
      setProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Determine if user is admin based on roles
  const isAdmin = !!user?.did && user.did === process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE;

  return {
    isLoggedIn: !!user,
    isLoading: isLoading || status === 'loading',
    user,
    isAdmin,
    profile,
    login,
    logout,
  };
}
