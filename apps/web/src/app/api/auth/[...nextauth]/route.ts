import { BackEndUrl } from "@/lib/constants";
import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: NextAuthUser }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const res = await fetch(BackEndUrl + "/auth/signin", {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            // const errorData = await res.json().catch(() => ({ message: res.statusText }));
            return null;
          }

          const user = await res.json();

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
