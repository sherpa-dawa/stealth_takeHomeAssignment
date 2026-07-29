import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is auto-configured in dev mode

  // Performance & Optimization
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Image Optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com",
      },
    ],
  },

  // Headers & Security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },

  // React & Compiler
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-*"],
    optimizeCss: true,
  },

  // Code Splitting & Bundle Optimization
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Path aliases are handled by tsconfig paths, no webpack config needed
};

export default nextConfig;
