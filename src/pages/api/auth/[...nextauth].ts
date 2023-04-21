// need this as per next-auth documentation. authOptions is given in auth.ts
import NextAuth from "next-auth/next";
import { authOptions } from "../../../../lib/auth";

export default NextAuth(authOptions)