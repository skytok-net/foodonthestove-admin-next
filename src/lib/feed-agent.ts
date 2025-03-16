'use client';

import { AtpAgent, AtpSessionData, AtpSessionEvent } from '@atproto/api';

// Configuration
const FEED_SESSION_STORAGE_KEY = 'feed-session';
const defaultServiceUrl = process.env.NEXT_PUBLIC_BSKY_SERVICE || 'https://bsky.social';
const FEED_HANDLE = process.env.NEXT_PUBLIC_FOODONTHESTOVE_HANDLE;
const FEED_PASSWORD = process.env.NEXT_PUBLIC_FOODONTHESTOVE_PASSWORD;

// Single instance of the feed agent that persists across the entire session
let feedAgentInstance: AtpAgent | null = null;
let feedAgentInitializationPromise: Promise<AtpAgent | null> | null = null;

// Rate limiting and backoff configuration
let retryCount = 0;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 2000; // 2 seconds

// Rate limit tracking
let isRateLimited = false;
let rateLimitResetTime = 0;
const RATE_LIMIT_COOLDOWN = 15 * 60 * 1000; // 15 minutes cooldown after hitting rate limit

// Request throttling
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5 seconds between requests

/**
 * Persists the feed session to localStorage
 */
function persistFeedSession(evt: AtpSessionEvent, sess?: AtpSessionData) {
  if (evt === 'create' || evt === 'update') {
    if (sess && typeof window !== 'undefined') {
      console.log('Persisting feed session to localStorage');
      localStorage.setItem(FEED_SESSION_STORAGE_KEY, JSON.stringify(sess));
    }
  } else if (evt === 'expired' || evt === 'create-failed') {
    if (typeof window !== 'undefined') {
      console.log('Removing expired feed session from localStorage');
      localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
    }
  }
}

/**
 * Checks if we're currently rate limited
 */
function checkRateLimit(): boolean {
  // First check if we're in a rate limit cooldown period
  if (isRateLimited) {
    // Check if the rate limit cooldown period has elapsed
    if (Date.now() > rateLimitResetTime) {
      console.log('Rate limit cooldown period has elapsed, resetting rate limit status');
      isRateLimited = false;
      return false;
    }
    
    // Still rate limited
    const remainingTime = Math.ceil((rateLimitResetTime - Date.now()) / 1000);
    console.log(`Still rate limited. Try again in ${remainingTime} seconds.`);
    return true;
  }
  
  // Then check if we need to throttle based on time since last request
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`Throttling request. Waiting ${waitTime}ms before next request.`);
    return true;
  }
  
  // Update last request time
  lastRequestTime = Date.now();
  return false;
}

/**
 * Implements exponential backoff for retrying API calls
 */
async function withExponentialBackoff<T>(fn: () => Promise<T>): Promise<T> {
  // If we're currently rate limited or need to throttle, wait before proceeding
  if (checkRateLimit()) {
    // If we're rate limited, wait for the cooldown period
    if (isRateLimited) {
      throw new Error('Currently rate limited. Try again later.');
    }
    
    // If we need to throttle, wait for the minimum interval
    const waitTime = MIN_REQUEST_INTERVAL - (Date.now() - lastRequestTime);
    if (waitTime > 0) {
      console.log(`Throttling request, waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      lastRequestTime = Date.now(); // Update last request time after waiting
    }
  }
  
  try {
    // Execute the function
    const result = await fn();
    
    // Reset retry count on success
    retryCount = 0;
    
    return result;
  } catch (error) {
    // Check if it's a rate limit error
    const isRateLimit = error instanceof Error && 
      (error.message.includes('429') || 
       error.message.toLowerCase().includes('rate limit') || 
       error.message.toLowerCase().includes('too many requests'));
    
    if (isRateLimit) {
      console.log('Rate limit error detected');
      
      // Set rate limit flag and reset time
      isRateLimited = true;
      
      // Increase cooldown period if we've hit the retry limit
      const cooldownMultiplier = retryCount >= MAX_RETRIES ? 3 : 1;
      rateLimitResetTime = Date.now() + (RATE_LIMIT_COOLDOWN * cooldownMultiplier);
      
      // If we've exceeded max retries, reset counter and throw
      if (retryCount >= MAX_RETRIES) {
        console.log(`Max retries (${MAX_RETRIES}) exceeded. Setting extended cooldown period.`);
        retryCount = 0;
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      // Calculate delay with exponential backoff
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      console.log(`Rate limit hit, retrying in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      
      // Increment retry count and wait
      retryCount++;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry the operation
      return withExponentialBackoff(fn);
    } else {
      // Not a rate limit error, reset retry count and rethrow
      retryCount = 0;
      throw error;
    }
  }
}

/**
 * Get a user agent if the user is logged in
 * This is used to prevent unnecessary authentication with the feed account
 */
async function getUserAgent(): Promise<AtpAgent | null> {
  if (typeof window === 'undefined') return null;
  
  try {
    // In client components, we can't use the headers() function from Next.js
    // Instead, we'll use a client-side approach to get the session
    
    // Check if we have a session in localStorage
    const sessionData = localStorage.getItem('next-auth.session-token');
    if (!sessionData) {
      console.log('No session found in localStorage');
      return null;
    }
    
    // For now, we'll just return null and let the feed agent handle it
    // This avoids the server-side API call that's causing the error
    return null;
  } catch (error) {
    console.error('Error getting user agent:', error);
    return null;
  }
}

/**
 * Initializes the feed agent - prefers the user's agent if logged in
 * Falls back to the dedicated feed agent only if necessary
 */
export async function initializeFeedAgent(): Promise<AtpAgent | null> {
  try {
    // Check if we're rate limited before attempting initialization
    if (checkRateLimit()) {
      console.log('Rate limited, cannot initialize feed agent');
      return null;
    }
    
    // First, try to use the user's agent if they're logged in
    const userAgent = await getUserAgent();
    if (userAgent) {
      console.log('Using logged-in user agent for feed');
      return userAgent;
    }
    
    console.log('No user logged in, falling back to feed-specific agent');
    
    // If we already have a feed agent instance, return it
    if (feedAgentInstance) {
      console.log('Returning existing feed agent instance');
      return feedAgentInstance;
    }
    
    // If initialization is already in progress, return the existing promise
    if (feedAgentInitializationPromise) {
      console.log('Feed agent initialization already in progress, waiting...');
      return feedAgentInitializationPromise;
    }
    
    // Start initialization
    console.log('Initializing feed agent');
    
    // Create a new promise for initialization
    feedAgentInitializationPromise = (async () => {
      try {
        // Check credentials
        if (!FEED_HANDLE || !FEED_PASSWORD) {
          console.error('Food on the Stove credentials not configured');
          return null;
        }
        
        // Create a new ATP agent
        const agent = new AtpAgent({
          service: defaultServiceUrl,
          persistSession: persistFeedSession
        });
        
        // Try to restore session from localStorage first
        if (typeof window !== 'undefined') {
          const storedSession = localStorage.getItem(FEED_SESSION_STORAGE_KEY);
          
          if (storedSession) {
            try {
              console.log('Found stored feed session, attempting to resume');
              const parsedSession = JSON.parse(storedSession);
              
              // Validate session data
              if (parsedSession.did && parsedSession.accessJwt && parsedSession.refreshJwt) {
                // Use withExponentialBackoff for resumeSession to handle rate limits
                await withExponentialBackoff(() => agent.resumeSession(parsedSession));
                
                if (agent.session) {
                  console.log('Successfully resumed feed session');
                  feedAgentInstance = agent;
                  return agent;
                }
              } else {
                console.warn('Invalid feed session data, clearing');
                localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
              }
            } catch (error) {
              console.warn('Failed to resume feed session:', error);
              localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
              
              // If it's a rate limit error, propagate it
              const isRateLimit = error instanceof Error && 
                (error.message.includes('429') || 
                 error.message.toLowerCase().includes('rate limit') || 
                 error.message.toLowerCase().includes('too many requests'));
                 
              if (isRateLimit) {
                throw error;
              }
              // Continue to login if not rate limited
            }
          }
        }
        
        // Add a small delay before login to avoid rapid successive requests
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Login with feed account using exponential backoff for rate limiting
        console.log('Logging in with feed account');
        
        // Use the withExponentialBackoff helper for login
        const loginResult = await withExponentialBackoff(() => 
          agent.login({
            identifier: FEED_HANDLE!,
            password: FEED_PASSWORD!
          })
        );
        
        if (!loginResult.success) {
          console.error('Failed to login with Food on the Stove account');
          return null;
        }
        
        console.log('Successfully logged in with feed account');
        feedAgentInstance = agent;
        return agent;
      } catch (error) {
        console.error('Error initializing feed agent:', error);
        
        // If it's a rate limit error, set the rate limit flag
        const isRateLimit = error instanceof Error && 
          (error.message.includes('429') || 
           error.message.toLowerCase().includes('rate limit') || 
           error.message.toLowerCase().includes('too many requests'));
           
        if (isRateLimit) {
          console.log('Rate limit detected during initialization, setting cooldown period');
          isRateLimited = true;
          rateLimitResetTime = Date.now() + RATE_LIMIT_COOLDOWN;
        }
        
        return null;
      } finally {
        // Clear the initialization promise so we can retry if needed
        feedAgentInitializationPromise = null;
      }
    })();
    
    return feedAgentInitializationPromise;
  } catch (error) {
    console.error('Error in initializeFeedAgent:', error);
    return null;
  }
}

/**
 * Gets the feed agent instance or initializes it if it doesn't exist
 */
export async function getFeedAgent(): Promise<AtpAgent | null> {
  // Check if we're rate limited before attempting to get an agent
  if (checkRateLimit()) {
    console.log('Rate limited, cannot get feed agent');
    throw new Error('Currently rate limited. Try again later.');
  }
  
  // Try to get the user agent first
  try {
    const userAgent = await getUserAgent();
    if (userAgent) {
      return userAgent;
    }
  } catch (error) {
    console.error('Error getting user agent:', error);
    // Continue to try feed agent
  }
  
  // Fall back to the feed-specific agent
  return feedAgentInstance || initializeFeedAgent();
}

/**
 * Resets the feed agent instance - useful for testing or if we need to forcefully
 * reinitialize the agent (e.g. after a long period of inactivity)
 */
export function resetFeedAgent(): void {
  feedAgentInstance = null;
  feedAgentInitializationPromise = null;
  retryCount = 0;
  
  // Don't reset rate limit status - this should persist even after reset
  // to prevent immediate retries after a reset
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem(FEED_SESSION_STORAGE_KEY);
  }
  
  console.log('Feed agent has been reset');
}

/**
 * Checks the current rate limit status
 * @returns Object with rate limit status information
 */
export function getRateLimitStatus(): { 
  isRateLimited: boolean; 
  remainingTime: number;
  lastRequestTime: number;
  timeSinceLastRequest: number;
} {
  const now = Date.now();
  const remainingTime = Math.max(0, rateLimitResetTime - now);
  const timeSinceLastRequest = now - lastRequestTime;
  
  return {
    isRateLimited,
    remainingTime,
    lastRequestTime,
    timeSinceLastRequest
  };
}
