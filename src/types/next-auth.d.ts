import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's AT Protocol DID */
      did?: string;
      /** The user's AT Protocol handle */
      handle?: string;
      /** The user's AT Protocol access JWT */
      accessJwt?: string;
      /** The user's AT Protocol refresh JWT */
      refreshJwt?: string;
      /** The AT Protocol service URL */
      service?: string;
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback in the OAuth providers.
   */
  interface User {
    /** The user's AT Protocol DID */
    did?: string;
    /** The user's AT Protocol handle */
    handle?: string;
    /** The user's AT Protocol access JWT */
    accessJwt?: string;
    /** The user's AT Protocol refresh JWT */
    refreshJwt?: string;
    /** The AT Protocol service URL */
    service?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** Object containing AT Protocol specific data */
    atpData?: {
      did?: string;
      handle?: string;
      accessJwt?: string;
      refreshJwt?: string;
      service?: string;
    };
  }
}
