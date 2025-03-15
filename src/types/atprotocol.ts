import { CredentialsSignin, User } from 'next-auth';

// Custom error class for AT Protocol authentication failures
export class AtpAuthError extends CredentialsSignin {
    constructor(message: string) {
      super();
      this.code = message;
    }
  }

export interface AtpUser extends User {
  handle?: string;
  accessJwt?: string;
  refreshJwt?: string;
  did?: string;
  service?: string;
}
