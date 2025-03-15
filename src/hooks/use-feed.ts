'use client';

import { useEffect, useCallback } from 'react';
import { useFeedStore } from '@/stores/feed-store';
import { AppBskyFeedDefs } from '@atproto/api';

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
    initializeFeedAgent,
  } = useFeedStore();

  // Wrap fetchFeed to ensure agent is initialized first
  const fetchFeed = useCallback(async () => {
    try {
      // Make sure we have an agent before fetching
      await initializeFeedAgent();
      return await storeFetchFeed();
    } catch (err) {
      console.error('Error in fetchFeed:', err);
      // Don't rethrow to prevent unhandled promise rejections
      return { success: false, error: err };
    }
  }, [initializeFeedAgent, storeFetchFeed]);

  useEffect(() => {
    let isMounted = true;
    
    // Initialize the feed agent and start subscription only if autoStart is true
    if (autoStart) {
      const initAndStart = async () => {
        try {
          if (!isMounted) return;
          
          // Initialize the agent first
          await initializeFeedAgent();
          
          // Then start the subscription if still mounted
          if (isMounted) {
            startSubscription(intervalMs);
          }
        } catch (err) {
          console.error('Failed to initialize feed agent:', err);
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
  }, [autoStart, startSubscription, stopSubscription, intervalMs, initializeFeedAgent]);

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
    initializeFeedAgent,
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
