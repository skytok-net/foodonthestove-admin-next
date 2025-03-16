'use client';

import { create } from 'zustand';
import { AtpAgent } from '@atproto/api';
import { AppBskyFeedDefs, AppBskyFeedPost } from '@atproto/api';
import { AppBskyEmbedImages } from '@atproto/api';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { getFeedAgent, initializeFeedAgent, resetFeedAgent } from '@/lib/feed-agent';
import { auth } from '@/auth';

// Define the user agent session type
interface UserAgent {
  agent: AtpAgent;
  did: string;
}

// Function to get the user's agent from auth.js
const getUserAgent = async (): Promise<UserAgent | null> => {
  try {
    // Only run this in the browser to avoid Next.js headers error
    if (typeof window === 'undefined') return null;
    
    try {
      // Get the session from auth.js
      const session = await auth();
      if (!session || !session.user) return null;
      
      // Extract AT Protocol specific data
      const { did, handle, accessJwt, refreshJwt } = session.user;
      
      // Validate required session data
      if (!did || !accessJwt || !refreshJwt) {
        console.error('Invalid user session data:', { did, accessJwt: !!accessJwt, refreshJwt: !!refreshJwt });
        return null;
      }
      
      // Create a new agent with the user's session
      const agent = new AtpAgent({ 
        service: process.env.NEXT_PUBLIC_BSKY_SERVICE || 'https://bsky.social' 
      });
      
      // Resume session with the user's credentials
      try {
        await agent.resumeSession({
          did,
          handle: handle || '',
          email: session.user.email || '',
          accessJwt,
          refreshJwt,
          active: true
        });
        
        return { agent, did };
      } catch (resumeError) {
        console.error('Error resuming user session:', resumeError);
        return null;
      }
    } catch (sessionError) {
      console.error('Error getting auth session:', sessionError);
      return null;
    }
  } catch (error) {
    console.error('Error getting user agent:', error);
    return null;
  }
};

export interface FeedPost {
  post: AppBskyFeedDefs.FeedViewPost;
  text: string;
  repostCount: number;
  likeCount: number;
  reposted: boolean;
  liked: boolean;
  likeUri?: string;
  repostUri?: string;
  avatar: string;
  handle: string;
  displayName: string;
  indexedAt: string;
  cid: string;
  uri: string;
  hasMedia: boolean;
  mediaType?: string;
  images?: { thumb: string; fullsize: string; alt: string }[];
}

export interface FeedState {
  feed: FeedPost[];
  cursor: string | undefined;
  isLoading: boolean;
  isLoadingMore: boolean;
  feedInterval: NodeJS.Timeout | null;
  tokenRefreshInterval: NodeJS.Timeout | null;
  error: string | null;
  fetchFeed: () => Promise<void>;
  fetchMoreFeed: () => Promise<void>;
  startSubscription: (intervalMs?: number) => void;
  stopSubscription: () => void;
  handleLike: (uri: string, cid: string, liked: boolean) => Promise<void>;
  handleRepost: (uri: string, cid: string, reposted: boolean) => Promise<void>;
  handleReply: (uri: string, cid: string, text: string) => Promise<void>;
  initializeFeedAgent: () => Promise<AtpAgent | null>;
  resetFeedAgent: () => void;
}

export const useFeedStore = create<FeedState>((set, get) => {
  return {
    feed: [],
    cursor: undefined,
    isLoading: false,
    isLoadingMore: false,
    feedInterval: null,
    tokenRefreshInterval: null,
    error: null,

    // Initialize the feed agent using our singleton approach
    initializeFeedAgent: async () => {
      try {
        // Call our singleton function that ensures only one agent exists
        const agent = await initializeFeedAgent();
        return agent;
      } catch (error) {
        console.error('Failed to initialize feed agent:', error);
        set({ 
          error: error instanceof Error ? error.message : 'Failed to initialize feed agent'
        });
        return null;
      }
    },

    // Reset the feed agent if needed (useful for testing or logout)
    resetFeedAgent: () => {
      resetFeedAgent();
      set({
        feed: [],
        cursor: undefined,
        error: null
      });
    },

    fetchFeed: async () => {
      set({ isLoading: true, error: null });

      try {
        // Get the feed agent (will initialize if needed)
        const feedAgent = await getFeedAgent();
        if (!feedAgent) {
          console.warn('Failed to get feed agent, returning empty feed');
          set({ isLoading: false, feed: [], cursor: undefined });
          return;
        }

        // Check if we have a valid session before making the request
        if (!feedAgent.session) {
          console.warn('No active session for feed agent, returning empty feed');
          set({ isLoading: false, feed: [], cursor: undefined });
          return;
        }

        // Fetch the feed
        let response: { success: boolean; data: { feed: FeedViewPost[]; cursor?: string } };
        try {
          response = await feedAgent.app.bsky.feed.getAuthorFeed({ 
            actor: process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE || '',
            limit: 20 
          });

          if (!response.success) {
            console.warn('Feed API returned unsuccessful response, returning empty feed');
            set({ isLoading: false, feed: [], cursor: undefined });
            return;
          }
        } catch (apiError) {
          console.error('API error fetching feed:', apiError);
          set({ isLoading: false, feed: [], cursor: undefined });
          return;
        }
        
        // Process the feed data
        const feed = response.data.feed.map((item: FeedViewPost) => {
          // item is already a FeedViewPost, and item.post is a PostView
          const post = item.post;
          const record = post.record as AppBskyFeedPost.Record;
          
          // Check if embed exists and has images property
          const hasImages = !!post.embed && 
            '$type' in post.embed && 
            post.embed.$type === 'app.bsky.embed.images#view' &&
            'images' in post.embed;
          
          let images: { thumb: string; fullsize: string; alt: string }[] = [];
          
          // Only access images if we've confirmed it exists
          if (hasImages && post.embed) {
            const imagesEmbed = post.embed as AppBskyEmbedImages.View;
            if (Array.isArray(imagesEmbed.images)) {
              images = imagesEmbed.images.map((img) => ({
                thumb: img.thumb,
                fullsize: img.fullsize,
                alt: img.alt,
              }));
            }
          }
          
          const hasMedia = images.length > 0;
          const mediaType = hasMedia ? 'images' : undefined;

          return {
            post: item, // Store the entire FeedViewPost
            text: record.text,
            repostCount: post.repostCount || 0,
            likeCount: post.likeCount || 0,
            reposted: !!post.viewer?.repost,
            liked: !!post.viewer?.like,
            likeUri: post.viewer?.like, // Store the like URI
            repostUri: post.viewer?.repost, // Store the repost URI
            avatar: post.author.avatar || '',
            handle: post.author.handle,
            displayName: post.author.displayName || post.author.handle,
            indexedAt: post.indexedAt,
            cid: post.cid,
            uri: post.uri,
            hasMedia,
            mediaType,
            images,
          };
        });

        set({
          feed,
          cursor: response.data.cursor,
          isLoading: false
        });
      } catch (error) {
        console.error('Error fetching feed:', error);
        
        // If agent has been reset, try initializing again
        if (error instanceof Error && error.message === 'Failed to get feed agent') {
          try {
            await initializeFeedAgent();
            await get().fetchFeed();
            return;
          } catch (initError) {
            console.error('Failed to reinitialize feed agent:', initError);
          }
        }
        
        set({
          isLoading: false,
          feed: [], // Return empty feed on error
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    },

    fetchMoreFeed: async () => {
      const { cursor, isLoadingMore } = get();

      if (isLoadingMore || !cursor) {
        return;
      }

      set({ isLoadingMore: true, error: null });

      try {
        // Get the feed agent (will initialize if needed)
        const feedAgent = await getFeedAgent();
        if (!feedAgent) {
          console.warn('Failed to get feed agent, returning empty feed');
          set({ isLoadingMore: false });
          return;
        }

        // Check if we have a valid session before making the request
        if (!feedAgent.session) {
          console.warn('No active session for feed agent, returning empty feed');
          set({ isLoadingMore: false });
          return;
        }

        // Fetch more feed items
        let response: { success: boolean; data: { feed: FeedViewPost[]; cursor?: string } };
        try {
          response = await feedAgent.app.bsky.feed.getAuthorFeed({
            actor: process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE || '',
            limit: 20,
            cursor,
          });

          if (!response.success) {
            console.warn('Feed API returned unsuccessful response for fetchMoreFeed');
            set({ isLoadingMore: false });
            return;
          }
        } catch (apiError) {
          console.error('API error fetching more feed:', apiError);
          set({ isLoadingMore: false });
          return;
        }

        // Process the new feed data
        const newFeedItems = response.data.feed.map((item: FeedViewPost) => {
          // item is already a FeedViewPost, and item.post is a PostView
          const post = item.post;
          const record = post.record as AppBskyFeedPost.Record;
          
          // Check if embed exists and has images property
          const hasImages = !!post.embed && 
            '$type' in post.embed && 
            post.embed.$type === 'app.bsky.embed.images#view' &&
            'images' in post.embed;
          
          let images: { thumb: string; fullsize: string; alt: string }[] = [];
          
          // Only access images if we've confirmed it exists
          if (hasImages && post.embed) {
            const imagesEmbed = post.embed as AppBskyEmbedImages.View;
            if (Array.isArray(imagesEmbed.images)) {
              images = imagesEmbed.images.map((img) => ({
                thumb: img.thumb,
                fullsize: img.fullsize,
                alt: img.alt,
              }));
            }
          }
          
          const hasMedia = images.length > 0;
          const mediaType = hasMedia ? 'images' : undefined;

          return {
            post: item, // Store the entire FeedViewPost
            text: record.text,
            repostCount: post.repostCount || 0,
            likeCount: post.likeCount || 0,
            reposted: !!post.viewer?.repost,
            liked: !!post.viewer?.like,
            likeUri: post.viewer?.like, // Store the like URI
            repostUri: post.viewer?.repost, // Store the repost URI
            avatar: post.author.avatar || '',
            handle: post.author.handle,
            displayName: post.author.displayName || post.author.handle,
            indexedAt: post.indexedAt,
            cid: post.cid,
            uri: post.uri,
            hasMedia,
            mediaType,
            images,
          };
        });

        set((state) => ({
          feed: [...state.feed, ...newFeedItems],
          cursor: response.data.cursor,
          isLoadingMore: false,
        }));
      } catch (error) {
        console.error('Error fetching more feed:', error);
        set({
          isLoadingMore: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    },
    
    startSubscription: (intervalMs = 60000) => {
      const { feedInterval, tokenRefreshInterval } = get();
      
      // Clear any existing intervals first
      if (feedInterval) clearInterval(feedInterval);
      if (tokenRefreshInterval) clearInterval(tokenRefreshInterval);
      
      // Ensure minimum interval to prevent rate limiting
      const safeIntervalMs = Math.max(intervalMs, 60000); // Minimum 60 seconds
      
      // Set up feed refresh interval with jitter to avoid synchronized requests
      // Add random jitter (±10% of interval) to prevent all clients from hitting the API at the same time
      const jitterFactor = 0.1; // 10% jitter
      const jitterRange = safeIntervalMs * jitterFactor;
      
      const newFeedInterval = setInterval(() => {
        // Add jitter to each request timing
        const jitter = Math.floor(Math.random() * jitterRange * 2) - jitterRange;
        
        // Use setTimeout with jitter inside the interval to vary each request time
        setTimeout(() => {
          // Only fetch if we're not already loading
          if (!get().isLoading) {
            get().fetchFeed().catch(err => {
              console.warn('Error in subscription fetch:', err);
              // Errors are handled in fetchFeed, no need to do anything here
            });
          } else {
            console.log('Skipping scheduled fetch because a fetch is already in progress');
          }
        }, jitter);
      }, safeIntervalMs);
      
      set({ 
        feedInterval: newFeedInterval, 
        tokenRefreshInterval: null // No need for separate token refresh with our singleton approach
      });
    },
    
    stopSubscription: () => {
      const { feedInterval, tokenRefreshInterval } = get();
      
      if (feedInterval) {
        clearInterval(feedInterval);
      }
      
      if (tokenRefreshInterval) {
        clearInterval(tokenRefreshInterval);
      }
      
      set({ 
        feedInterval: null, 
        tokenRefreshInterval: null 
      });
    },
    
    handleLike: async (uri: string, cid: string, liked: boolean) => {
      try {
        const userAgentData = await getUserAgent();
        if (!userAgentData) {
          throw new Error('User must be logged in to like posts');
        }
        
        const { agent } = userAgentData;
        
        if (liked) {
          // Unlike the post
          await agent.deleteLike(uri);
        } else {
          // Like the post
          await agent.like(uri, cid);
        }
        
        // Update the post in the feed
        set((state) => ({
          feed: state.feed.map(post => {
            if (post.uri === uri) {
              return {
                ...post,
                liked: !liked,
                likeCount: liked ? Math.max(0, post.likeCount - 1) : post.likeCount + 1,
                likeUri: !liked ? uri : undefined
              };
            }
            return post;
          })
        }));
      } catch (error) {
        console.error('Error handling like:', error);
        set({ error: error instanceof Error ? error.message : 'Failed to like/unlike post' });
      }
    },
    
    handleRepost: async (uri: string, cid: string, reposted: boolean) => {
      try {
        const userAgentData = await getUserAgent();
        if (!userAgentData) {
          throw new Error('User must be logged in to repost');
        }
        
        const { agent } = userAgentData;
        
        if (reposted) {
          // Undo repost
          await agent.deleteRepost(uri);
        } else {
          // Repost
          await agent.repost(uri, cid);
        }
        
        // Update the post in the feed
        set((state) => ({
          feed: state.feed.map(post => {
            if (post.uri === uri) {
              return {
                ...post,
                reposted: !reposted,
                repostCount: reposted ? Math.max(0, post.repostCount - 1) : post.repostCount + 1,
                repostUri: !reposted ? uri : undefined
              };
            }
            return post;
          })
        }));
      } catch (error) {
        console.error('Error handling repost:', error);
        set({ error: error instanceof Error ? error.message : 'Failed to repost/unrepost post' });
      }
    },
    
    handleReply: async (uri: string, cid: string, text: string) => {
      try {
        const userAgentData = await getUserAgent();
        if (!userAgentData) {
          throw new Error('User must be logged in to reply');
        }
        
        const { agent, did } = userAgentData;
        
        await agent.app.bsky.feed.post.create(
          { repo: did },
          {
            text,
            reply: {
              root: { uri, cid },
              parent: { uri, cid }
            },
            createdAt: new Date().toISOString()
          }
        );
        
        // Refresh the feed to show the reply
        await get().fetchFeed();
      } catch (error) {
        console.error('Error handling reply:', error);
        set({ error: error instanceof Error ? error.message : 'Failed to post reply' });
      }
    }
  };
});
