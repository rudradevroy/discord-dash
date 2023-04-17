// Handles the auth logic with next-auth

import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { Db } from "mongodb";
import clientPromise from "./mongodb";
import GoogleProvider from 'next-auth/providers/google'

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
        session: async ({ session, token }) => {
            if (session?.user) {
              session.user.id = token.uid;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
              token.uid = user.id;
            }
            return token;
          },
        },
            
        }