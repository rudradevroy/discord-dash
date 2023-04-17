//as per doc 

import type { DefaultUser } from 'next-auth';

interface User{
    name: string
    email: string
    image: string
    id: string
}

declare module 'next-auth' {
    interface Session {
      user?: DefaultUser & {
        id: string;
      };
    }
  }
  
  declare module 'next-auth/jwt/types' {
    interface JWT {
      uid: string;
    }
  }