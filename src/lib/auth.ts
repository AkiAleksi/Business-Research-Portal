import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const isDev = process.env.NODE_ENV === "development";

export const authOptions: NextAuthOptions = {
  providers: [
    // Development credentials provider
    ...(isDev
      ? [
          CredentialsProvider({
            name: "Kehitystili",
            credentials: {
              email: { label: "Sähköposti", type: "email", placeholder: "dev@example.com" },
              password: { label: "Salasana", type: "password" },
            },
            async authorize(credentials) {
              // Any email/password combo works in dev
              if (credentials?.email) {
                return {
                  id: "dev-user-1",
                  name: credentials.email.split("@")[0],
                  email: credentials.email,
                  image: null,
                };
              }
              return null;
            },
          }),
        ]
      : []),
    // Google OAuth (production)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
