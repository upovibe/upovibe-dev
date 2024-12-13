import type { NextConfig } from "next";
import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env file
dotenvConfig();

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
  env: {
    NEXT_PUBLIC_AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    NEXT_PUBLIC_AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    NEXT_PUBLIC_AUTH_ALLOWED_EMAIL: process.env.AUTH_ALLOWED_EMAIL,
    NEXT_PUBLIC_DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
