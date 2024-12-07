
// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub],
// })

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// The default export is the NextAuth handler function
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!, // Ensure you have this environment variable set
      clientSecret: process.env.AUTH_GITHUB_SECRET!, // Ensure you have this environment variable set
    }),
  ],
  pages: {
    signIn: "/login", // Optional: Define a custom sign-in page if needed
  },
  callbacks: {
    async signIn({ profile }) {
      // Custom sign-in logic, e.g., check email
      return profile?.email === "your-email@example.com"; // Replace with your own logic
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`; // Redirect after login
    },
  },
});
