
// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub],
// })

// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";

// // Export handlers, signIn, signOut, and auth
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHub({
//       clientId: process.env.AUTH_GITHUB_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Optional: Define a custom sign-in page  PLs remove it not important 
//   },
//   callbacks: {
//     async signIn({ profile }) {
//       const allowedEmail = process.env.AUTH_ALLOWED_EMAIL;
//       if (profile?.email === allowedEmail) {
//         return true;
//       }
//       return false;
//     },
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`; // Redirect after login
//     },
//   },
// });


import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Export handlers, signIn, signOut, and auth
export const { handlers, signIn, signOut, auth } = NextAuth({
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
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`; // Redirect after login
    },
  },
});
