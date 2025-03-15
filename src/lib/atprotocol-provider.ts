// lib/atprotocol-provider.ts
import { AtpAgent } from '@atproto/api';
import { CredentialsConfig } from 'next-auth/providers';
import { AtpAuthError } from '@/types/atprotocol';
import { AtpUser } from '@/types/atprotocol';
import { gql } from '@apollo/client';
import { getClient } from './apollo-client';

// Define the structure of our credentials - used internally for type checking

export function ATProtocolProvider(options?: Partial<CredentialsConfig>): CredentialsConfig {
  return {
    id: 'atprotocol',
    name: 'AT Protocol',
    type: 'credentials',
    credentials: {
      identifier: { label: 'Username or Email', type: 'text', placeholder: 'username.bsky.social' },
      password: { label: 'Password', type: 'password' },
      service: { label: 'Service', type: 'text', placeholder: 'https://bsky.social', value: process.env.NEXT_PUBLIC_BSKY_SERVICE || 'https://bsky.social' }
    },
    async authorize(credentials) {
      try {
        if (!credentials) {
          throw new AtpAuthError('No credentials provided');
        }

        const identifier = credentials.identifier as string;
        const password = credentials.password as string;
        const service = (credentials.service as string) || process.env.NEXT_PUBLIC_BSKY_SERVICE || 'https://bsky.social';

        // Create an instance of AtpAgent
        const agent = new AtpAgent({ service });

        // Authenticate with the AT Protocol service
        const result = await agent.login({
          identifier,
          password
        });

        if (!result.success) {
          throw new AtpAuthError('Invalid credentials');
        }

        // Fetch the user's profile
        const profile = await agent.getProfile({ actor: result.data.did });

        if (!profile.success) {
          throw new AtpAuthError('Failed to fetch profile');
        }

        // Create the user object
        const user: AtpUser = {
          id: result.data.did,
          name: profile.data.displayName || profile.data.handle,
          email: identifier.includes('@') ? identifier : undefined,
          image: profile.data.avatar,
          handle: profile.data.handle,
          // Store the session data for later use
          accessJwt: result.data.accessJwt,
          refreshJwt: result.data.refreshJwt,
          did: result.data.did,
          service
        };

        // Query for the user in Supabase by DID
        const client = getClient();
        const { data: userData } = await client.query({
          query: gql`
            query GetUserByDid($did: String!) {
              usersCollection(filter: {did: {eq: $did}}) {
                edges {
                  node {
                    id
                    did
                    handle
                    pdsUrl
                    firstName
                    lastName
                    email
                    userRolesCollection {
                      edges {
                        node {
                          id
                          roleId
                          role {
                            id
                            name
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
            did: result.data.did
          }
        });

        const userExists = userData?.usersCollection?.edges?.length > 0;

        if (!userExists) {
          console.log('User not found in database, creating new user...');
          
          // First, get the user role by key
          const { data: roleData } = await client.query({
            query: gql`
              query GetRoleByKey($key: String!) {
                rolesCollection(filter: {key: {eq: $key}}) {
                  edges {
                    node {
                      id
                      name
                      key
                    }
                  }
                }
              }
            `,
            variables: {
              key: 'user'
            }
          });

          const roleId = roleData?.rolesCollection?.edges?.[0]?.node?.id;

          if (!roleId) {
            console.error('User role not found');
            throw new AtpAuthError('Failed to create user: Role not found');
          }

          // Create the user
          const { data: newUserData } = await client.mutate({
            mutation: gql`
              mutation CreateUser($input: UsersInsertInput!) {
                insertIntoUsersCollection(objects: [$input]) {
                  records {
                    id
                    did
                    handle
                    pdsUrl
                  }
                }
              }
            `,
            variables: {
              input: {
                did: result.data.did,
                handle: profile.data.handle,
                pdsUrl: service,
                firstName: profile.data.displayName ? profile.data.displayName.split(' ')[0] : undefined,
                lastName: profile.data.displayName ? profile.data.displayName.split(' ').slice(1).join(' ') : undefined,
                email: identifier.includes('@') ? identifier : undefined,
                metadata: {
                  avatar: profile.data.avatar
                }
              }
            }
          });

          const newUserId = newUserData?.insertIntoUsersCollection?.records?.[0]?.id;

          if (!newUserId) {
            console.error('Failed to create user');
            throw new AtpAuthError('Failed to create user in database');
          }

          // Create the user role
          await client.mutate({
            mutation: gql`
              mutation CreateUserRole($input: UserRolesInsertInput!) {
                insertIntoUserRolesCollection(objects: [$input]) {
                  records {
                    id
                    userId
                    roleId
                  }
                }
              }
            `,
            variables: {
              input: {
                userId: newUserId,
                roleId: roleId
              }
            }
          });

          console.log('User and role created successfully');
        } else {
          console.log('User found in database');
        }

        return user;
      } catch (error) {
        console.error('ATP authentication error:', error);
        if (error instanceof AtpAuthError) {
          throw error;
        }
        throw new AtpAuthError('Authentication failed');
      }
    },
    ...options
  };
}
