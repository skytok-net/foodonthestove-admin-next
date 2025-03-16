// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';

// Export the handlers from the central auth.ts file
export const { GET, POST } = handlers;

// Use Node.js runtime instead of edge to avoid issues with headers
export const runtime = 'nodejs';
