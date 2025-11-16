import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login", // Optional: custom login page
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});