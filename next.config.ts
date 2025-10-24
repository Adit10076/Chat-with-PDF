import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    clientSegmentCache: true,
    nodeMiddleware: true,
    optimizeCss: false
  },
  allowedDevOrigins: ['*']
};

export default nextConfig;
