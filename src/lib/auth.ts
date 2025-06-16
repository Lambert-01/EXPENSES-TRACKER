import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { users } from "@/server/schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

// Debug check for environment variables
console.log('Checking environment variables:');
console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET);
console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET);
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          image: token.picture as string,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.email) {
        return token;
      }

      const dbUser = await db.query.users.findFirst({
        where: eq(users.email, token.email),
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};

export default authOptions; 