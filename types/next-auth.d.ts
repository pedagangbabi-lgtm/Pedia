// types/next-auth.d.ts 
// BUAT FILE INI di root project (sejajar dengan package.json)

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: 'admin' | 'staff';
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: 'admin' | 'staff';
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: 'admin' | 'staff';
  }
}