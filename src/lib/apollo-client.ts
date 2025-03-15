import { HttpLink, ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import React from "react";

// Create a client factory function
function makeClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  const uri = `${supabaseUrl}/graphql/v1`;
  
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri,
    headers: {
      Authorization: `Bearer ${supabaseAnonKey}`,
      apiKey: supabaseAnonKey,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    ssrMode: typeof window === "undefined",
  });
}

// For client components
let clientSideClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getClient() {
  // For client-side, we want to use a singleton instance of the Apollo Client
  if (typeof window !== 'undefined') {
    if (!clientSideClient) {
      clientSideClient = makeClient();
    }
    return clientSideClient;
  }
  
  // For server-side, create a new client for each request
  return makeClient();
}

// For backward compatibility
export const query = async (options: Parameters<ApolloClient<NormalizedCacheObject>['query']>[0]) => {
  const client = getClient();
  return client.query(options);
};

// For backward compatibility
export const PreloadQuery = (props: { children: React.ReactNode }) => {
  return React.createElement(React.Fragment, null, props.children);
};
