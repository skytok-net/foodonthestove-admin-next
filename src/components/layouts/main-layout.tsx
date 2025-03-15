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
import { useNavigation } from '@/hooks/use-navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, Menu } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  // Only need one piece of state for client-side mounting
  const [mounted, setMounted] = useState(false);
  
  // Use auth and navigation hooks
  const { logout, user, isAdmin, profile } = useAuth();
  const { topNavItems, isAdminSection, isReady: isNavigationReady } = useNavigation();
  
  // Single useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Skip rendering the top navigation if we're in the admin section
  if (isAdminSection) {
    return <>{children}</>;
  }
  
  // Determine if navigation is loading but app is mounted
  const isNavigationLoading = mounted && !isNavigationReady;
  
  // For non-mounted state, render a simple placeholder that's hydration-safe
  // This prevents hydration mismatches that can occur with conditional interactive elements
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="bg-sidebar-background text-sidebar-foreground shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  {/* Static link is fine during SSR */}
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
              {/* No auth-dependent UI during SSR */}
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    );
  }
  
  // Full interactive UI once client-side mounted
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
              
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                {isNavigationLoading ? (
                  // Show skeleton navigation items when navigation is loading
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-9 w-24 rounded-xl" />
                    ))}
                  </>
                ) : (
                  // Show actual navigation items when ready
                  topNavItems.map((item) => {
                    // Only show Dashboard if user is admin
                    const showAdminItem = item.path === '/admin/dashboard';
                    if (showAdminItem && (!user || !isAdmin)) {
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
                  })
                )}
              </div>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
              {/* Theme Switcher */}
              <ThemeToggle />
              
              {/* User Menu */}
              {isNavigationLoading ? (
                <Skeleton className="h-8 w-8 rounded-full" />
              ) : user ? (
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
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="default" size="sm" className="btn-auth btn-register bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href="/register">Register</Link>
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
  );
}

// Helper function to determine if a navigation item is active
function isActive(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(path + '/');
}
