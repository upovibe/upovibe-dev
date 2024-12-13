import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
    domains: [],
  },
};

export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//         pathname: "/**",
//       },
//     ],
//     domains: [],
//   },
//   async headers() {
//     return [
//       {
//         source: '/favicon.ico',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=3600',
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const getHeaders = async () => {
//   return [
//     {
//       source: '/favicon.ico',
//       headers: [
//         {
//           key: 'Cache-Control',
//           value: 'public, max-age=3600',
//         },
//       ],
//     },
//   ];
// };

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//         pathname: "/**",
//       },
//     ],
//     domains: [],
//   },
//   async headers() {
//     return getHeaders();
//   },
// };

// export default nextConfig;