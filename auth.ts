import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const allowedEmail = process.env.AUTH_ALLOWED_EMAIL;
      if (profile?.email === allowedEmail) {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
  },
  session: {
    strategy: "database",
  },
});
