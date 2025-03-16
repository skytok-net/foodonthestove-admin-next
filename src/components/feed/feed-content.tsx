'use client';

import React, { useEffect, useState } from 'react';
import { useFeed } from '@/hooks/use-feed';
import { useAuth } from '@/hooks/use-auth';
import { FeedPost } from '@/stores/feed-store';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HeartIcon, RepeatIcon, MessageCircleIcon, LockIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function FeedContent() {
  const { feed, isLoading, error, fetchFeed, handleLike, handleRepost } = useFeed(false); // Disable autoStart
  const { isLoggedIn } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only attempt to fetch feed after component is mounted
    if (isMounted && !fetchAttempted && !isLoading) {
      const fetchData = async () => {
        setFetchAttempted(true);
        try {
          await fetchFeed();
        } catch (err) {
          console.error('Error fetching feed:', err);
        }
      };
      
      fetchData();
    }
  }, [isMounted, fetchAttempted, isLoading, fetchFeed]);

  // Retry mechanism for feed loading
  useEffect(() => {
    let retryTimer: NodeJS.Timeout | null = null;
    
    if (error && retryCount < 3 && isMounted) {
      // Check if it's a rate limit error
      const isRateLimit = error.toString().includes('429') || 
                          error.toString().includes('rate limit') || 
                          error.toString().toLowerCase().includes('too many requests');
      
      // Use a longer delay for rate limit errors
      const retryDelay = isRateLimit ? 10000 : 2000; // 10 seconds for rate limits, 2 seconds for other errors
      
      retryTimer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setFetchAttempted(false); // Reset to trigger a new fetch
      }, retryDelay);
    }
    
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [error, retryCount, isMounted]);

  // Show loading skeletons immediately to avoid layout shift
  if (!isMounted || isLoading) {
    return <FeedLoadingSkeleton />;
  }

    if (error) {
    // Check if it's a rate limit error
    const isRateLimit = error.toString().includes('429') || 
                        error.toString().includes('rate limit') || 
                        error.toString().toLowerCase().includes('too many requests');
    
    return (
      <div className="p-4 rounded-lg bg-card shadow-sm">
        <div className="flex flex-col items-center justify-center text-center p-4">
          {isRateLimit ? (
            <>
              <p className="text-amber-500 font-medium mb-2">API Rate Limit Reached</p>
              <p className="text-muted-foreground mb-4">
                We&apos;ve reached the BlueSky API rate limit. The system will automatically retry after a cooldown period.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-4 w-full max-w-2xl">
                <h3 className="font-medium mb-2 text-amber-700 dark:text-amber-300">Rate Limiting Information</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  To prevent excessive API requests, we&apos;ve implemented rate limiting with the following features:
                </p>
                <ul className="text-sm text-left list-disc pl-5 text-muted-foreground">
                  <li>Automatic throttling of requests (5 second minimum between requests)</li>
                  <li>Exponential backoff for retries (increasing delay between attempts)</li>
                  <li>15-minute cooldown period after hitting rate limits</li>
                  <li>Persistent session management to reduce authentication requests</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <div className="bg-card p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Sample Post 1</h3>
                  <p className="text-sm text-muted-foreground">
                    Healthy meal prep ideas for firefighters on shift: grilled chicken with roasted vegetables, 
                    quinoa bowls, and overnight oats for quick energy.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Sample Post 2</h3>
                  <p className="text-sm text-muted-foreground">
                    Join our nutrition workshop next week! Learn how proper nutrition can improve 
                    energy levels and recovery time for first responders.
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => {
                  setFetchAttempted(false);
                  setRetryCount(0);
                }} 
                variant="outline" 
                className="mt-4"
              >
                Try Again
              </Button>
            </>
          ) : (
            <>
              <p className="text-red-500 mb-2">Error loading feed: {error.toString()}</p>
              <Button 
                onClick={() => {
                  setFetchAttempted(false);
                  setRetryCount(0);
                }} 
                variant="outline" 
                className="mt-2"
              >
                Retry
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No posts to display.</p>
        <Button 
          onClick={() => {
            setFetchAttempted(false);
            setRetryCount(0);
          }} 
          variant="outline" 
          className="mt-2"
        >
          Refresh
        </Button>
      </div>
    );
  }

  // Safely render feed items with error handling
  return (
    <div className="space-y-4 p-4">
      {Array.isArray(feed) ? (
        feed.map((post: FeedPost) => (
          <FeedItem 
            key={post.cid} 
            post={post} 
            onLike={handleLike}
            onRepost={handleRepost}
            isLoggedIn={isLoggedIn}
          />
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          <p>Error loading feed data.</p>
          <Button 
            onClick={() => {
              setFetchAttempted(false);
              setRetryCount(0);
            }} 
            variant="outline" 
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}

// Separate loading skeleton component for reuse
export function FeedLoadingSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden rounded-xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface FeedItemProps {
  post: FeedPost;
  onLike: (uri: string, cid: string, liked: boolean) => Promise<void>;
  onRepost: (uri: string, cid: string, reposted: boolean) => Promise<void>;
  isLoggedIn: boolean;
}

export function FeedItem({ post, onLike, onRepost, isLoggedIn }: FeedItemProps) {
  const formattedDate = post.indexedAt 
    ? formatDistanceToNow(new Date(post.indexedAt), { addSuffix: true }) 
    : '';

  const handleLikeClick = async () => {
    if (!isLoggedIn) return;
    await onLike(post.uri, post.cid, !post.liked);
  };

  const handleRepostClick = async () => {
    if (!isLoggedIn) return;
    await onRepost(post.uri, post.cid, !post.reposted);
  };

  // Render social interaction buttons based on login status
  const renderInteractionButton = (
    icon: React.ReactNode,
    count: number,
    onClick: () => void,
    isActive: boolean,
    activeClass: string
  ) => {
    // Note: isActive and activeClass are used in the className string interpolation below
    if (isLoggedIn) {
      return (
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center space-x-1 ${isActive ? activeClass : ''}`}
          onClick={onClick}
        >
          {icon}
          <span>{count > 0 ? count : ''}</span>
        </Button>
      );
    } else {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 opacity-50 cursor-not-allowed"
                disabled
              >
                {icon}
                <span>{count > 0 ? count : ''}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Login to interact with posts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  };

  return (
    <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.avatar} alt={post.displayName} />
            <AvatarFallback>{post.handle.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{post.displayName}</p>
                <p className="text-sm text-gray-500">@{post.handle}</p>
              </div>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            <div className="mt-2">
              <p className="whitespace-pre-wrap">{post.text}</p>
              {post.hasMedia && post.images && post.images.length > 0 && (
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {post.images.map((img, index) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-md">
                      <Image
                        src={img.thumb}
                        alt={img.alt || 'Post image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center space-x-4">
              {renderInteractionButton(
                <HeartIcon className={`h-4 w-4 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />,
                post.likeCount,
                handleLikeClick,
                post.liked,
                'fill-red-500 text-red-500'
              )}
              
              {renderInteractionButton(
                <RepeatIcon className={`h-4 w-4 ${post.reposted ? 'fill-green-500 text-green-500' : ''}`} />,
                post.repostCount,
                handleRepostClick,
                post.reposted,
                'fill-green-500 text-green-500'
              )}
              
              {renderInteractionButton(
                <MessageCircleIcon className="h-4 w-4" />,
                0,
                () => {},
                false,
                ''
              )}
            </div>
            
            {!isLoggedIn && (
              <div className="mt-2 flex items-center justify-center text-xs text-gray-500 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                <LockIcon className="h-3 w-3 mr-1" />
                <span>Login to interact with posts</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
