// Handles the auth logic with next-auth

import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";
import GoogleProvider from 'next-auth/providers/google'
import NextAuth from "next-auth/next";

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if(!clientId || clientId.length === 0){
        throw new Error('Missing Google Client ID')
    }
    if(!clientSecret || clientSecret.length === 0){
        throw new Error('Missing Google Client Secret')
    }
    
    return {clientId, clientSecret}
}
export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt"
    },
    pages:{
        signIn: './login'
    },
    providers:[
        GoogleProvider({ 
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,

        }),
    ],
    callbacks: {
        //@ts-ignore
        async session({ session, token }) {
          console.log('session', session)
          console.log('token:', token)
          const newSession = {expires: session.expires, user: token.user}
          return newSession
        },
        jwt({ account, token, user }) {
          if (user) {
            const newToken = {...token, user}
            return newToken
          }
    
          return token
        },
      }
    }
    
    export default NextAuth(authOptions)