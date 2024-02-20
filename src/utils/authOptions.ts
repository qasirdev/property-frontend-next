import { AuthOptions, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000, // wait for response time, because the local environment often login timeout, so change this configuration
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000, // wait for response time, because the local environment often login timeout, so change this configuration
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3009/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (res.ok && json) {
          return json.result;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV !== "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/api/auth/signout')) {
        console.log(
          "Signout redirect initiated. Will go to URL:",
          url
        );
        return baseUrl; // Redirect to base of frontend ('http://localhost:3000')
      }
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.id = user.id;
        }
        if (account) {
          token.provider = account.provider;
          token.accessToken = account.access_token;
        }
        return ({ ...token, ...user });
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
        session.user.favoriteIds = token.favoriteIds;
        session.user.accessToken = token.accessToken;
        session.user.provider = token.provider;
      }
      return session;
    }
  }
};
