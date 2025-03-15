'use client';

import { create } from 'zustand';
import { AtpAgent, AtpSessionData, AtpSessionEvent } from '@atproto/api';
import { AppBskyFeedDefs, AppBskyFeedPost } from '@atproto/api';
import { AppBskyEmbedImages } from '@atproto/api';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

const defaultServiceUrl = process.env.NEXT_PUBLIC_BSKY_SERVICE || 'https://bsky.social';
// Feed store should only use its own session key, never the auth session key
const FEED_SESSION_STORAGE_KEY = 'feed-session'; // Feed-specific session key
const FEED_HANDLE = process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE;
const FEED_PASSWORD = process.env.NEXT_PUBLIC_FOODONTHESTOVE_PASSWORD;

// Define feed-specific event types
enum FeedSessionEventType {
  REFRESH = 'REFRESH',
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

// Define event data types
interface FeedSessionEventMap {
  [FeedSessionEventType.REFRESH]: AtpSessionData | undefined;
  [FeedSessionEventType.ERROR]: Error;
  [FeedSessionEventType.LOGIN]: AtpSessionData;
  [FeedSessionEventType.LOGOUT]: undefined;
}

// Type-safe event emitter
type EventCallback<T> = (data: T) => void;

// Create a typed event emitter for feed session events
const feedSessionEvents = {
  listeners: new Map<FeedSessionEventType, Set<EventCallback<unknown>>>(),
  
  on<T extends FeedSessionEventType>(
    event: T, 
    callback: EventCallback<FeedSessionEventMap[T]>
  ) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    // We need to cast here because TypeScript can't track the relationship
    // between the event type and callback parameter type through the Map
    this.listeners.get(event)?.add(callback as EventCallback<unknown>);
    return () => this.off(event, callback);
  },
  
  off<T extends FeedSessionEventType>(
    event: T, 
    callback: EventCallback<FeedSessionEventMap[T]>
  ) {
    this.listeners.get(event)?.delete(callback as EventCallback<unknown>);
  },
  
  emit<T extends FeedSessionEventType>(
    event: T, 
    data: FeedSessionEventMap[T]
  ) {
    this.listeners.get(event)?.forEach(callback => {
      // Cast back to the expected type when calling
      (callback as EventCallback<FeedSessionEventMap[T]>)(data);
    });
  }
};

// Helper function to ensure errors are properly typed
function ensureError(error: unknown): Error {
  if (error instanceof Error) return error;
  return new Error(String(error));
}

// Stable callback for feed session persistence - defined outside to avoid context issues
const feedPersistSession = (evt: AtpSessionEvent, sess?: AtpSessionData) => {
  if (evt === 'create' || evt === 'update') {
    if (sess && typeof window !== 'undefined') {
      console.log('Persisting feed session to localStorage');
      localStorage.setItem(FEED_SESSION_STORAGE_KEY, JSON.stringify(sess));
      // Emit appropriate event
      if (evt === 'create') {
        feedSessionEvents.emit(FeedSessionEventType.LOGIN, sess);
      } else {
        feedSessionEvents.emit(FeedSessionEventType.REFRESH, sess);
      }
    }
  } else if (evt === 'expired' || evt === 'create-failed') {
    if (typeof window !== 'undefined') {
      console.log('Removing expired feed session from localStorage');
      localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
      // Emit error event
      feedSessionEvents.emit(FeedSessionEventType.ERROR, ensureError('Session expired or creation failed'));
    }
  }
};

// Function to refresh the feed agent session - only used for the feed, not for user interactions
const refreshFeedAgentSession = async (agent: AtpAgent): Promise<AtpSessionData | null> => {
  try {
    console.log('Refreshing feed agent session');
    
    // First try to refresh the session using the ATP protocol
    try {
      console.log('Attempting to refresh feed session via ATP protocol');
      const refreshResult = await agent.com.atproto.server.refreshSession();
      
      if (refreshResult.success && agent.session) {
        console.log('Successfully refreshed feed session via ATP protocol');
        // Store the refreshed session
        if (typeof window !== 'undefined') {
          localStorage.setItem(FEED_SESSION_STORAGE_KEY, JSON.stringify(agent.session));
          // Emit refresh event
          feedSessionEvents.emit(FeedSessionEventType.REFRESH, agent.session);
        }
        return agent.session;
      }
    } catch (refreshError) {
      console.warn('Failed to refresh feed session via ATP protocol:', refreshError);
      // Emit error event
      feedSessionEvents.emit(FeedSessionEventType.ERROR, ensureError(refreshError));
      // Continue to re-login approach
    }
    
    // If refresh failed, reinitialize with the Food on the Stove credentials
    console.log('Falling back to re-login for feed session');
    const handle = process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE;
    const password = process.env.NEXT_PUBLIC_FOODONTHESTOVE_PASSWORD;
    
    if (!handle || !password) {
      const error = new Error('Food on the Stove credentials not configured');
      feedSessionEvents.emit(FeedSessionEventType.ERROR, error);
      throw error;
    }
    
    // Login with the feed account
    const loginResult = await agent.login({ 
      identifier: handle, 
      password: password 
    });

    if (!loginResult.success) {
      const error = new Error('Failed to login with Food on the Stove account');
      feedSessionEvents.emit(FeedSessionEventType.ERROR, error);
      throw error;
    }
    
    console.log('Successfully logged in with Food on the Stove account');
    
    // Store the session with the feed-specific key
    if (agent.session && typeof window !== 'undefined') {
      localStorage.setItem(FEED_SESSION_STORAGE_KEY, JSON.stringify(agent.session));
      // Emit login event
      if (agent.session) {
        feedSessionEvents.emit(FeedSessionEventType.LOGIN, agent.session);
      }
    }
    
    return agent.session || null;
  } catch (error) {
    console.error('Error refreshing feed agent session:', error);
    feedSessionEvents.emit(FeedSessionEventType.ERROR, ensureError(error));
    return null;
  }
};

import { auth } from '@/auth';

// Function to get the user's agent from auth.js
const getUserAgent = async (): Promise<AtpAgent | null> => {
  try {
    // Access the auth session directly
    if (typeof window === 'undefined') return null;
    
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
    const agent = new AtpAgent({ service: defaultServiceUrl });
    
    // Resume session with the user's credentials
    try {
      const sessionData: AtpSessionData = {
        did,
        handle: handle || '',
        email: session.user.email || '',
        accessJwt,
        refreshJwt,
        active: true
      };
      
      await agent.resumeSession(sessionData);
      return agent;
    } catch (resumeError) {
      console.error('Error resuming user session:', resumeError);
      return null;
    }
  } catch (error) {
    console.error('Error getting user agent:', error);
    return null;
  }
};

// Function to get the feed agent
const getFeedAgent = async (): Promise<AtpAgent | null> => {
  try {
    if (typeof window === 'undefined') return null;
    
    // Check if feed session exists
    const sessionData = localStorage.getItem(FEED_SESSION_STORAGE_KEY);
    if (!sessionData) {
      console.log('No feed session found in localStorage');
      return null;
    }
    
    console.log('Found feed session in localStorage, creating agent');
    
    // Create a new agent with the feed session
    const agent = new AtpAgent({ 
      service: defaultServiceUrl,
      // Use the stable callback for session persistence
      persistSession: feedPersistSession
    });
    
    try {
      const parsedSession = JSON.parse(sessionData);
      
      // Validate session data before attempting to resume
      if (!parsedSession.did || !parsedSession.accessJwt || !parsedSession.refreshJwt) {
        console.error('Invalid feed session data in storage');
        localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
        feedSessionEvents.emit(FeedSessionEventType.ERROR, ensureError('Invalid session data'));
        throw new Error('Invalid feed session data');
      }
      
      console.log('Resuming feed session');
      await agent.resumeSession(parsedSession);
      // Only emit REFRESH event if agent.session exists
      if (agent.session) {
        feedSessionEvents.emit(FeedSessionEventType.REFRESH, agent.session);
      }
      return agent;
    } catch (parseError) {
      console.error('Failed to parse feed session data:', parseError);
      localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
      feedSessionEvents.emit(FeedSessionEventType.ERROR, ensureError(parseError));

      console.log('Attempting to log in with feed account after session parse error');
      // now log back in
      try {
        const response = await agent.login({ 
          identifier: FEED_HANDLE || '', 
          password: FEED_PASSWORD || '' 
        });

        if (!response.success) {
          const error = new Error('Failed to reinitialize feed agent after session expiration');
          feedSessionEvents.emit(FeedSessionEventType.ERROR, error);
          throw error;
        } else {
          console.log('Successfully logged in with feed account');
          localStorage.setItem(FEED_SESSION_STORAGE_KEY, JSON.stringify(agent.session));
          if (agent.session) {
            feedSessionEvents.emit(FeedSessionEventType.LOGIN, agent.session);
          }
        }
        return agent;
      } catch (loginError) {
        console.error('Failed to login with feed account:', loginError);
        feedSessionEvents.emit(FeedSessionEventType.ERROR, ensureError(loginError));
        return null;
      }
    }
  } catch (error) {
    console.error('Error getting feed agent:', error);
    return null;
  }
};

// Function to handle token expiration errors
const handleTokenExpiration = async (feedAgent: AtpAgent): Promise<boolean> => {
  try {
    // Try to get a fresh session from auth.js
    const session = await auth();
    
    if (session && session.user) {
      // Extract AT Protocol specific data
      const { did, handle, accessJwt, refreshJwt } = session.user;
      
      // Validate required session data
      if (!did || !accessJwt || !refreshJwt) {
        console.error('Invalid refreshed session data');
        return false;
      }
      
      // If we have a valid session, update the feed agent session
      if (typeof window !== 'undefined') {
        // Convert the session to the format expected by AtpAgent
        const sessionData: AtpSessionData = {
          did,
          handle: handle || '',
          email: session.user.email || '',
          accessJwt,
          refreshJwt,
          active: true
        };
        
        localStorage.setItem(FEED_SESSION_STORAGE_KEY, JSON.stringify(sessionData));
        
        // Emit login event with the session data
        if (sessionData) {
          feedSessionEvents.emit(FeedSessionEventType.LOGIN, sessionData);
        }
      
        // Try to resume the session with the refreshed credentials
        await feedAgent.resumeSession(sessionData);
        return true;
      }
    }
    
    // If refresh failed, try to re-login
    return false;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return false;
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
  feedAgent: AtpAgent | null;
  fetchFeed: () => Promise<void>;
  fetchMoreFeed: () => Promise<void>;
  startSubscription: (intervalMs?: number) => void;
  stopSubscription: () => void;
  handleLike: (uri: string, cid: string, liked: boolean) => Promise<void>;
  handleRepost: (uri: string, cid: string, reposted: boolean) => Promise<void>;
  handleReply: (uri: string, cid: string, text: string) => Promise<void>;
  initializeFeedAgent: () => Promise<AtpAgent | null>;
  logoutFeedAgent: () => boolean;
}

export const useFeedStore = create<FeedState>((set, get) => {
  // We don't need to listen for user logout events since the feed agent should continue working
  // independently of the user's authentication status

  return {
    feed: [],
    cursor: undefined,
    isLoading: false,
    isLoadingMore: false,
    feedInterval: null,
    tokenRefreshInterval: null,
    error: null,
    feedAgent: null,

    initializeFeedAgent: async () => {
      try {
        console.log('Initializing feed agent');
        
        // First try to get an existing feed agent
        const existingAgent = await getFeedAgent();
        if (existingAgent) {
          console.log('Using existing feed agent from localStorage');
          set({ feedAgent: existingAgent });
          return existingAgent;
        }
        
        console.log('No existing feed agent found, creating new one');
        
        // No existing agent, create a new one
        const handle = process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE;
        const password = process.env.NEXT_PUBLIC_FOODONTHESTOVE_PASSWORD;
        
        if (!handle || !password) {
          throw new Error('Food on the Stove credentials not configured');
        }

        // Create a new agent for the feed
        const feedAgent = new AtpAgent({ 
          service: defaultServiceUrl,
          // Use the stable callback for session persistence
          persistSession: feedPersistSession
        });
        
        // Try to restore session from feed-specific storage
        if (typeof window !== 'undefined') {
          const storedSession = localStorage.getItem(FEED_SESSION_STORAGE_KEY);
          if (storedSession) {
            try {
              console.log('Found stored feed session, attempting to resume');
              const parsedSession = JSON.parse(storedSession);
              
              // Validate session data before attempting to resume
              if (!parsedSession.did || !parsedSession.accessJwt || !parsedSession.refreshJwt) {
                console.error('Invalid feed session data in storage:', parsedSession);
                localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
                throw new Error('Invalid feed session data');
              }
              
              await feedAgent.resumeSession(parsedSession);
              // Only emit REFRESH event if agent.session exists
              if (feedAgent.session) {
                feedSessionEvents.emit(FeedSessionEventType.REFRESH, feedAgent.session);
              }
              set({ feedAgent });
              return feedAgent;
            } catch (error) {
              console.error('Failed to resume feed session:', error);
              localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
              // Continue with login below
            }
          }
        }
        
        console.log('Logging in with feed account');
        // Login with the feed account
        const loginResult = await feedAgent.login({ 
          identifier: handle, 
          password: password 
        });

        if (!loginResult.success) {
          throw new Error('Failed to login with Food on the Stove account');
        }
        
        console.log('Successfully logged in with feed account');
        
        // Explicitly store session after successful login
        if (feedAgent.session && typeof window !== 'undefined') {
          console.log('Storing feed session in localStorage after login');
          localStorage.setItem(FEED_SESSION_STORAGE_KEY, JSON.stringify(feedAgent.session));
        }

        if (feedAgent.session) {
          feedSessionEvents.emit(FeedSessionEventType.LOGIN, feedAgent.session);
        }

        set({ feedAgent });
        return feedAgent;
      } catch (error) {
        console.error('Failed to initialize feed agent:', error);
        set({ 
          error: error instanceof Error ? error.message : 'Failed to initialize feed agent',
          feedAgent: null
        });
        return null;
      }
    },

    fetchFeed: async () => {
      set({ isLoading: true, error: null });

      try {
        // The feed agent should work independently of user login status
        // so we don't need to check for user session
        
        // Get or initialize the feed agent
        let feedAgent = get().feedAgent;
        if (!feedAgent) {
          feedAgent = await get().initializeFeedAgent();
          if (!feedAgent) {
            throw new Error('Failed to initialize feed agent');
          }
        }

        // Check if we have a valid session before making the request
        if (!feedAgent.session) {
          throw new Error('No active session for feed agent');
        }

        // Fetch the feed with token expiration handling
        try {
          const response = await feedAgent.app.bsky.feed.getAuthorFeed({ 
            actor: process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE || '',
            limit: 20 
          });

          if (!response.success) {
            throw new Error('Failed to fetch feed');
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
            isLoading: false,
          });
        } catch (error) {
          // Check if error is a token expiration error
          if (error instanceof Error && error.message.includes('Token has expired')) {
            console.log('Attempting to refresh expired token...');
            
            // Try to refresh the token
            const refreshed = await handleTokenExpiration(feedAgent);
            
            if (refreshed) {
              // If token was refreshed successfully, try fetching again
              const response = await feedAgent.app.bsky.feed.getAuthorFeed({ 
                actor: process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE || '',
                limit: 20 
              });
              
              if (!response.success) {
                throw new Error('Failed to fetch feed after token refresh');
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
                isLoading: false,
              });
            } else {
              // If refresh failed, reinitialize the feed agent
              feedAgent = await get().initializeFeedAgent();
              if (!feedAgent) {
                throw new Error('Failed to reinitialize feed agent after token expiration');
              }
              
              // Try fetching again with the new agent
              const response = await feedAgent.app.bsky.feed.getAuthorFeed({ 
                actor: process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE || '',
                limit: 20 
              });
              
              if (!response.success) {
                throw new Error('Failed to fetch feed after agent reinitialization');
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
                isLoading: false,
              });
            }
          } else {
            // For other errors, rethrow
            throw error;
          }
        }
      } catch (error) {
        console.error('Error fetching feed:', error);
        
        // If we get an authentication error, try to refresh the token or reinitialize
        if (error instanceof Error && 
            (error.message.includes('authentication') || 
             error.message.includes('token') || 
             error.message.includes('Not logged in') ||
             error.message.includes('No active session'))) {
          
          try {
            const feedAgent = get().feedAgent;
            if (feedAgent) {
              const refreshed = await refreshFeedAgentSession(feedAgent);
              if (refreshed) {
                // Retry with the refreshed token
                await get().fetchFeed();
                return;
              }
            }
            
            // If refresh failed, try to reinitialize the agent
            await get().initializeFeedAgent();
            await get().fetchFeed();
            return;
          } catch (refreshError) {
            console.error('Error refreshing token or reinitializing agent:', refreshError);
          }
        }
        
        set({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    },

    fetchMoreFeed: async () => {
      const { cursor, isLoadingMore, feedAgent } = get();

      if (isLoadingMore || !cursor || !feedAgent) {
        return;
      }
      
      // The feed agent should work independently of user login status
      // so we don't need to check for user session

      set({ isLoadingMore: true, error: null });

      try {
        // Check if we have a valid session before making the request
        if (!feedAgent.session) {
          throw new Error('No active session for feed agent');
        }

        // Fetch more feed items with token expiration handling
        try {
          const response = await feedAgent.app.bsky.feed.getAuthorFeed({
            actor: process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE || '',
            limit: 20,
            cursor,
          });

          if (!response.success) {
            throw new Error('Failed to fetch more feed items');
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
          // Check if error is a token expiration error
          if (error instanceof Error && error.message.includes('Token has expired')) {
            console.log('Attempting to refresh expired token for fetchMoreFeed...');
            
            // Try to refresh the token
            const refreshed = await handleTokenExpiration(feedAgent);
            
            if (refreshed) {
              // If token was refreshed successfully, try fetching again
              const response = await feedAgent.app.bsky.feed.getAuthorFeed({
                actor: process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE || '',
                limit: 20,
                cursor,
              });
              
              if (!response.success) {
                throw new Error('Failed to fetch more feed items after token refresh');
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
            } else {
              // If refresh failed, reinitialize the feed agent
              const newFeedAgent = await get().initializeFeedAgent();
              if (!newFeedAgent) {
                throw new Error('Failed to reinitialize feed agent after token expiration');
              }
              
              // Try fetching again with the new agent
              const response = await newFeedAgent.app.bsky.feed.getAuthorFeed({
                actor: process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE || '',
                limit: 20,
                cursor,
              });
              
              if (!response.success) {
                throw new Error('Failed to fetch more feed items after agent reinitialization');
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
            }
          } else {
            // For other errors, rethrow
            throw error;
          }
        }
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
      
      // Set up feed refresh interval
      const newFeedInterval = setInterval(() => {
        get().fetchFeed();
      }, intervalMs);
      
      // Set up token refresh interval (every 12 hours)
      const newTokenInterval = setInterval(async () => {
        const { feedAgent } = get();
        if (feedAgent && feedAgent.session) {
          await refreshFeedAgentSession(feedAgent);
        }
      }, 12 * 60 * 60 * 1000); // 12 hours
      
      set({ 
        feedInterval: newFeedInterval, 
        tokenRefreshInterval: newTokenInterval 
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
        const userAgent = await getUserAgent();
        if (!userAgent) {
          throw new Error('User must be logged in to like posts');
        }
        
        try {
          if (liked) {
            // Unlike the post
            await userAgent.deleteLike(uri);
          } else {
            // Like the post
            await userAgent.like(uri, cid);
          }
          
          // Update the post in the feed
          set((state) => ({
            feed: state.feed.map(post => {
              if (post.uri === uri) {
                return {
                  ...post,
                  liked: !liked,
                  likeCount: liked ? Math.max(0, post.likeCount - 1) : post.likeCount + 1,
                  // Update the like URI if we just liked the post
                  likeUri: !liked ? uri : undefined
                };
              }
              return post;
            })
          }));
        } catch (actionError) {
          // Check if the error is due to token expiration
          if (actionError instanceof Error && 
              (actionError.message.includes('authentication') || 
               actionError.message.includes('token') || 
               actionError.message.includes('expired'))) {
            
            console.log('Token expired during like action, attempting to refresh...');
            
            // Get a fresh user agent with updated tokens
            const refreshedAgent = await getUserAgent();
            if (!refreshedAgent) {
              throw new Error('Failed to refresh user session');
            }
            
            // Retry the action with the refreshed agent
            if (liked) {
              await refreshedAgent.deleteLike(uri);
            } else {
              await refreshedAgent.like(uri, cid);
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
          } else {
            // For other errors, rethrow
            throw actionError;
          }
        }
      } catch (error) {
        console.error('Error handling like:', error);
        set({ error: error instanceof Error ? error.message : 'Failed to like/unlike post' });
      }
    },
    
    handleRepost: async (uri: string, cid: string, reposted: boolean) => {
      try {
        const userAgent = await getUserAgent();
        if (!userAgent) {
          throw new Error('User must be logged in to repost');
        }
        
        try {
          if (reposted) {
            // Undo repost
            await userAgent.deleteRepost(uri);
          } else {
            // Repost
            await userAgent.repost(uri, cid);
          }
          
          // Update the post in the feed
          set((state) => ({
            feed: state.feed.map(post => {
              if (post.uri === uri) {
                return {
                  ...post,
                  reposted: !reposted,
                  repostCount: reposted ? Math.max(0, post.repostCount - 1) : post.repostCount + 1,
                  // Update the repost URI if we just reposted the post
                  repostUri: !reposted ? uri : undefined
                };
              }
              return post;
            })
          }));
        } catch (actionError) {
          // Check if the error is due to token expiration
          if (actionError instanceof Error && 
              (actionError.message.includes('authentication') || 
               actionError.message.includes('token') || 
               actionError.message.includes('expired'))) {
            
            console.log('Token expired during repost action, attempting to refresh...');
            
            // Get a fresh user agent with updated tokens
            const refreshedAgent = await getUserAgent();
            if (!refreshedAgent) {
              throw new Error('Failed to refresh user session');
            }
            
            // Retry the action with the refreshed agent
            if (reposted) {
              await refreshedAgent.deleteRepost(uri);
            } else {
              await refreshedAgent.repost(uri, cid);
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
          } else {
            // For other errors, rethrow
            throw actionError;
          }
        }
      } catch (error) {
        console.error('Error handling repost:', error);
        set({ error: error instanceof Error ? error.message : 'Failed to repost/unrepost post' });
      }
    },
    
    handleReply: async (uri: string, cid: string, text: string) => {
      try {
        const userAgent = await getUserAgent();
        if (!userAgent) {
          throw new Error('User must be logged in to reply');
        }
        
        try {
          // Ensure we have a valid DID
          if (!userAgent.session?.did) {
            throw new Error('Invalid user session: missing DID');
          }
          
          await userAgent.app.bsky.feed.post.create(
            { repo: userAgent.session.did },
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
        } catch (actionError) {
          // Check if the error is due to token expiration
          if (actionError instanceof Error && 
              (actionError.message.includes('authentication') || 
               actionError.message.includes('token') || 
               actionError.message.includes('expired'))) {
            
            console.log('Token expired during reply action, attempting to refresh...');
            
            // Get a fresh user agent with updated tokens
            const refreshedAgent = await getUserAgent();
            if (!refreshedAgent) {
              throw new Error('Failed to refresh user session');
            }
            
            // Ensure we have a valid DID
            if (!refreshedAgent.session?.did) {
              throw new Error('Invalid refreshed user session: missing DID');
            }
            
            // Retry the action with the refreshed agent
            await refreshedAgent.app.bsky.feed.post.create(
              { repo: refreshedAgent.session.did },
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
          } else {
            // For other errors, rethrow
            throw actionError;
          }
        }
      } catch (error) {
        console.error('Error handling reply:', error);
        set({ error: error instanceof Error ? error.message : 'Failed to post reply' });
      }
    },
    
    logoutFeedAgent: () => {
      const { feedAgent } = get();
      
      if (feedAgent) {
        // We can't directly modify the session property, so we'll create a new agent
        // and replace the existing one, effectively logging out
        
        // Clear the feed session from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
        }
        
        // Stop any active subscriptions
        get().stopSubscription();
        
        // Reset the store state
        set({
          feedAgent: null,
          feed: [],
          cursor: undefined,
          error: null
        });
        
        return true;
      }
      
      return false;
    }
  };
});
