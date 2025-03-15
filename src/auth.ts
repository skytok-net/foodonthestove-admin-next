// auth.ts
import NextAuth from "next-auth";
import { ATProtocolProvider } from "./lib/atprotocol-provider";
import { AtpUser } from "@/types/atprotocol";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    ATProtocolProvider(),
    // Additional providers like GitHub, Google, etc.
  ],
  callbacks: {
    async session({ session, token }) {
      // Add AT Protocol specific data to the session
      if (token.atpData) {
        session.user = {
          ...session.user,
          ...token.atpData
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      // Store AT Protocol data in the JWT when user signs in
      if (user) {
        token.atpData = {
          did: user.did,
          handle: user.handle,
          accessJwt: user.accessJwt,
          refreshJwt: user.refreshJwt,
          service: user.service
        } as Partial<AtpUser>;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  }
});
