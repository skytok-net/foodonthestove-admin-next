'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useFeedStore } from '@/stores/feed-store';
import { AppBskyFeedDefs } from '@atproto/api';
import { initializeFeedAgent } from '@/lib/feed-agent';

// Type for the feed view post from AT Protocol
type FeedViewPost = AppBskyFeedDefs.FeedViewPost;

/**
 * Hook for accessing and managing feed data
 * @param autoStart Whether to automatically start the subscription when the hook is mounted
 * @param intervalMs The interval at which to fetch new feed data
 * @returns Feed data and methods for managing the feed
 */
export const useFeed = (autoStart = false, intervalMs = 30000) => {
  const {
    feed,
    isLoading,
    isLoadingMore,
    error,
    fetchFeed: storeFetchFeed,
    fetchMoreFeed,
    startSubscription,
    stopSubscription,
    handleLike,
    handleRepost,
    handleReply,
  } = useFeedStore();
  
  // Use a ref to track initialization status
  const isInitializedRef = useRef(false);

  // Initialize the feed agent once
  const ensureInitialized = useCallback(async () => {
    if (!isInitializedRef.current) {
      try {
        // This uses the singleton pattern from feed-agent.ts
        const agent = await initializeFeedAgent();
        if (agent) {
          isInitializedRef.current = true;
          return true;
        }
        return false;
      } catch (err) {
        console.error('Error initializing feed agent:', err);
        return false;
      }
    }
    return true;
  }, []);

  // Wrap fetchFeed to ensure agent is initialized first
  const fetchFeed = useCallback(async () => {
    try {
      // Make sure the agent is initialized
      const initialized = await ensureInitialized();
      if (!initialized) {
        console.warn('Failed to initialize feed agent, returning empty feed');
        // Return a successful response with empty feed instead of throwing
        return { success: true, feed: [] };
      }
      
      // Fetch the feed
      return await storeFetchFeed();
    } catch (err) {
      // Check if it's a rate limit error
      const isRateLimit = err instanceof Error && 
        (err.message.includes('429') || 
         err.message.toLowerCase().includes('rate limit') || 
         err.message.toLowerCase().includes('too many requests'));
         
      if (isRateLimit) {
        console.warn('Rate limit detected in fetchFeed, will retry after cooldown');
        // Propagate rate limit errors so they can be handled by the UI
        throw err;
      } else {
        console.error('Error in fetchFeed:', err);
        // Return a successful response with empty feed for non-rate-limit errors
        return { success: true, feed: [] };
      }
    }
  }, [ensureInitialized, storeFetchFeed]);

  useEffect(() => {
    let isMounted = true;
    
    // Initialize the feed agent and start subscription only if autoStart is true
    if (autoStart) {
      const initAndStart = async () => {
        try {
          if (!isMounted) return;
          
          // Initialize the agent first
          const initialized = await ensureInitialized();
          
          // Then start the subscription if still mounted and initialized
          if (isMounted && initialized) {
            // Use a longer interval to reduce API calls
            const safeIntervalMs = Math.max(intervalMs, 60000); // Minimum 60 seconds
            startSubscription(safeIntervalMs);
          }
        } catch (err) {
          // Check if it's a rate limit error
          const isRateLimit = err instanceof Error && 
            (err.message.includes('429') || 
             err.message.toLowerCase().includes('rate limit') || 
             err.message.toLowerCase().includes('too many requests'));
             
          if (isRateLimit) {
            console.warn('Rate limit detected during initialization, will retry after cooldown');
          } else {
            console.error('Failed to initialize feed agent:', err);
          }
        }
      };
      
      initAndStart();
    }

    return () => {
      isMounted = false;
      if (autoStart) {
        stopSubscription();
      }
    };
  }, [autoStart, startSubscription, stopSubscription, intervalMs, ensureInitialized]);

  return {
    feed,
    isLoading,
    isLoadingMore,
    error,
    fetchFeed,
    fetchMoreFeed,
    startSubscription,
    stopSubscription,
    handleLike,
    handleRepost,
    handleReply,
    isInitialized: isInitializedRef.current,
  };
}

/**
 * Helper function to format a feed post for display
 * @param post The feed post to format
 * @returns Formatted post data
 */
export function formatFeedPost(post: FeedViewPost) {
  const { post: postView, reason } = post;
  
  // Check if it's a repost and has a valid reason with 'by' property
  const isRepost = !!reason;
  const isReasonRepost = isRepost && reason && '$type' in reason && 
    (reason.$type === 'app.bsky.feed.defs#reasonRepost' || 
     (typeof reason.$type === 'string' && reason.$type.includes('Repost')));
  
  // Ensure record has a default structure with a text property
  const record = postView.record || { text: '' };
  
  // Process embed data if it exists
  let processedEmbed = null;
  if (postView.embed) {
    // Check if embed has images
    if ('images' in postView.embed && Array.isArray(postView.embed.images)) {
      processedEmbed = {
        ...postView.embed,
        images: postView.embed.images
      };
    } else {
      // If no images, just pass through the embed
      processedEmbed = postView.embed;
    }
  }
  
  return {
    cid: postView.cid,
    uri: postView.uri,
    author: {
      did: postView.author.did,
      handle: postView.author.handle,
      displayName: postView.author.displayName || '',
      avatar: postView.author.avatar || '',
    },
    record,
    indexedAt: postView.indexedAt,
    likeCount: postView.likeCount || 0,
    repostCount: postView.repostCount || 0,
    replyCount: postView.replyCount || 0,
    isRepost,
    isReasonRepost,
    reason,
    embed: processedEmbed,
  };
}
