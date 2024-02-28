import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
  name: "Username",
  credentials: {
    username: { label: "User Name" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    // add logic to check if user exists in DB and password is valid
    if (credentials.username === "paul" && credentials.password === "123") {
      return { name: "Paul2" };
    }
    // invalid creds
    else return null;
  },
});

const config = {
  providers: [Google, credentialsConfig],
  callbacks: {
    authorized({ request, auth }) {
      console.log(auth);
      const { pathname } = request.nextUrl;
      if (pathname === "/middlewarepage") return !!auth;
      return true;
    },
  },
  trustHost: true,
  secret: "yabbadabbado",
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
