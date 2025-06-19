import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 's3-alpha-sig.figma.com',
        protocol: 'https',
      },
      {
        hostname: 'image.tmdb.org',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
