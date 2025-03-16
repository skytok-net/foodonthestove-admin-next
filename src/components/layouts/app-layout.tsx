'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { Providers } from '@/components/providers/providers';
import { useNavigation } from '@/hooks/use-navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use auth hook
  const { logout, user, isAdmin, profile } = useAuth();
  
  // Use navigation hook with fallback
  const navigation = useNavigation();
  
  // Fallback navigation items in case the navigation store isn't ready
  const fallbackNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Feed', path: '/feed' },
    { name: 'Programs', path: '/programs' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/admin/dashboard', adminOnly: true }
  ];
  
  // Use navigation items from store if available, otherwise use fallback
  const navItems = navigation.isReady && navigation.topNavigation && navigation.topNavigation.length > 0
    ? navigation.topNavigation.map(item => ({
        name: item.name || '',
        path: item.path || '',
        adminOnly: item.path === '/admin/dashboard'
      }))
    : fallbackNavItems;
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Add a small delay to simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Skip rendering the top navigation if we're in the admin section
  const isAdminSection = pathname.startsWith('/admin') && pathname !== '/admin/dashboard';
  if (isAdminSection) {
    return (
      <Providers>
        {children}
      </Providers>
    );
  }
  
  // For non-mounted state, render a simple placeholder that's hydration-safe
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="bg-sidebar-background text-sidebar-foreground shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                      <Image 
                        src="/app.png" 
                        alt="Food on the Stove" 
                        fill
                        sizes="(max-width: 768px) 100vw, 32px"
                        className="object-contain" 
                        priority
                      />
                    </div>
                    <span className="text-xl font-bold text-primary">
                      FoodOnTheStove
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    );
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <Providers>
        <div className="flex min-h-screen flex-col items-center justify-center p-6">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Initializing layout...</p>
        </div>
      </Providers>
    );
  }
  
  // Full interactive UI once client-side mounted
  return (
    <Providers>
      <div className="min-h-screen bg-background">
        <nav className="bg-sidebar-background text-sidebar-foreground shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                      <Image 
                        src="/app.png" 
                        alt="Food on the Stove" 
                        fill
                        sizes="(max-width: 768px) 100vw, 32px"
                        className="object-contain" 
                        priority
                      />
                    </div>
                    <span className="text-xl font-bold text-primary">
                      FoodOnTheStove
                    </span>
                  </Link>
                </div>
                
                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                  {navItems.map((item) => {
                    // Skip admin-only items for non-admin users
                    if (item.adminOnly && (!user || !isAdmin)) {
                      return null;
                    }
                    
                    return (
                      <Button
                        key={item.path}
                        variant={isActive(pathname, item.path) ? "secondary" : "ghost"}
                        className={cn(
                          "rounded-xl", 
                          isActive(pathname, item.path) && "bg-nav-active-bg",
                          isActive(pathname, item.path) && "nav-item-active"
                        )}
                        asChild
                      >
                        <Link href={item.path} data-nav-link>
                          {item.name}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
                {/* Theme Switcher */}
                <ThemeToggle />
                
                {/* User Menu */}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage 
                            src={profile?.avatar || undefined} 
                            alt={profile?.displayName || (user.handle ? user.handle : 'User')} 
                          />
                          <AvatarFallback>
                            {user.handle ? user.handle.substring(0, 2).toUpperCase() : 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="dropdown-menu w-56 shadow-lg">
                      <DropdownMenuItem asChild>
                        <Link href={`/profile/${user.handle}`}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => logout()}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Button variant="default" size="sm" className="btn-auth btn-login bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button variant="default" size="sm" className="btn-auth btn-register bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href="/auth/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Toaster />
      </div>
    </Providers>
  );
}

// Helper function to determine if a navigation item is active
function isActive(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(path + '/');
}
