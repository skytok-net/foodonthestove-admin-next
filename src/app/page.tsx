'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeedContent } from '@/components/feed/feed-content';
import { Loader2, ArrowRight } from 'lucide-react';
import AppLayout from '@/components/layouts/app-layout';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';

interface UserRoleEdge {
  node?: {
    role?: {
      key?: string;
    };
  };
}

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = session?.user;

  // Fetch user roles when session is available
  useEffect(() => {
    const fetchUserRoles = async () => {
      if (user?.did) {
        try {
          const client = getClient();
          const { data } = await client.query({
            query: gql`
              query GetUserRoles($did: String!) {
                usersCollection(filter: {did: {eq: $did}}) {
                  edges {
                    node {
                      id
                      userRolesCollection {
                        edges {
                          node {
                            role {
                              key
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              did: user.did
            },
            fetchPolicy: 'network-only'
          });

          // Check if user has admin role
          const userData = data?.usersCollection?.edges?.[0]?.node;
          const userRoles = userData?.userRolesCollection?.edges || [];
          const hasAdminRole = userRoles.some((edge: UserRoleEdge) => edge?.node?.role?.key === 'admin');
          
          setIsAdmin(hasAdminRole);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user roles:', error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchUserRoles();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [user?.did, status]);
  
  return (
    <AppLayout>
      <div className="space-y-12">
        {/* Hero Section with Call-to-Action */}
        <section className="relative py-12 px-6 md:py-20 md:px-10 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Healthy Nutrition for Firefighters
              </h1>
              <p className="text-xl text-muted-foreground">
                Food On The Stove provides nutritious meals and education designed specifically for firefighters to improve their health and wellbeing.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {status === 'authenticated' ? (
                  <>
                    <Button size="lg" asChild>
                      <Link href="/feed">
                        View Feed <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    {loading ? (
                      <Button variant="outline" size="lg" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </Button>
                    ) : isAdmin && (
                      <Button variant="outline" size="lg" asChild>
                        <Link href="/admin/dashboard" onClick={(e) => {
                          if (!isAdmin) {
                            e.preventDefault();
                            console.log('Admin navigation blocked - User not admin');
                            
                            const params = new URLSearchParams();
                            params.set('path', '/admin/dashboard');
                            params.set('uid', user?.id || 'unknown');
                            // We don't have direct access to userRoles in the session, so we'll pass an empty array
                            params.set('roles', '[]');
                            params.set('isAdminFlag', String(isAdmin));
                            
                            router.push(`/no-admin?${params.toString()}`);
                          } else {
                            console.log('Navigating to admin dashboard as admin:', isAdmin);
                          }
                        }}>
                          Admin Dashboard
                        </Link>
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button size="lg" className="btn-auth btn-login" asChild>
                      <Link href="/auth/login">
                        Login
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="btn-auth btn-register" asChild>
                      <Link href="/auth/register">
                        Register
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="relative w-full max-w-md h-64 md:h-80">
              <Image 
                src="/app.png" 
                alt="Food on the Stove"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Nutrition Programs</h3>
              <p>Explore our specially designed nutrition programs for firefighters that focus on health, energy, and longevity.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Meal Planning</h3>
              <p>Get started with customized meal plans for your station that are easy to prepare and nutritionally balanced.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Educational Resources</h3>
              <p>Access educational resources on health and nutrition specifically tailored for the unique needs of firefighters.</p>
            </div>
          </div>
        </section>
        
        {/* Feed Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Latest Updates</h2>
          <FeedContent />
        </section>
        
        {/* Footer */}
        <footer className="border-t pt-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Food On The Stove</h3>
              <p className="text-muted-foreground">
                Promoting health and wellness for firefighters through nutrition education and meal planning.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/programs" className="text-muted-foreground hover:text-primary">Programs</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <p className="text-muted-foreground">
                Follow us on social media for the latest updates, tips, and resources.
              </p>
              <div className="flex gap-4 mt-4">
                {/* Social media icons/links would go here */}
              </div>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm mt-8 pt-4 border-t">
            <p>© {new Date().getFullYear()} Food On The Stove. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
}
