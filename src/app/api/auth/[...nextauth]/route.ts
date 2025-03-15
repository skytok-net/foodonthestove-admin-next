// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';

// Export the handlers from the central auth.ts file
export const { GET, POST } = handlers;
