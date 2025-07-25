/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Performance optimizations
  compress: true,
  generateEtags: true,
  trailingSlash: false,
  
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config, { dev, isServer }) => {
    // PDF generation optimization
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        // Separate chunk for PDF generation libraries
        pdf: {
          name: 'pdf-generator',
          test: /[\\/]node_modules[\\/](jspdf|jspdf-autotable)[\\/]/,
          chunks: 'all',
          priority: 10,
          enforce: true,
        },
        // Separate chunk for large utilities
        decimal: {
          name: 'decimal-utils',
          test: /[\\/]node_modules[\\/](decimal\.js)[\\/]/,
          chunks: 'all',
          priority: 9,
          enforce: true,
        },
      }
    }
    return config
  },

  headers: async () => {
    return [
      // Static assets caching
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Icons and images caching
      {
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=31536000" },
        ],
      },
      {
        source: "/images/:path*", 
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=31536000" },
        ],
      },
      // Fonts caching
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Security headers for all pages
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // Page caching for static content
      {
        source: "/((?!api|_next).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  poweredByHeader: false,
  serverRuntimeConfig: {
    cookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    }
  }
};

export default nextConfig;
