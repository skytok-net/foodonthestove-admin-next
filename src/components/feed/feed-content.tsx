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
      retryTimer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setFetchAttempted(false); // Reset to trigger a new fetch
      }, 2000); // Retry after 2 seconds
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
    return (
      <div className="p-4 text-red-500">
        <p>Error loading feed: {error}</p>
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

  return (
    <div className="space-y-4 p-4">
      {feed.map((post: FeedPost) => (
        <FeedItem 
          key={post.cid} 
          post={post} 
          onLike={handleLike}
          onRepost={handleRepost}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
}

// Separate loading skeleton component for reuse
function FeedLoadingSkeleton() {
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

function FeedItem({ post, onLike, onRepost, isLoggedIn }: FeedItemProps) {
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
    if (isLoggedIn) {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1"
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
