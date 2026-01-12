/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
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
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      },
      {
        source: "/icons/:path*", 
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      },
      // Security headers for pages
      {
        source: "/:path*",
        headers: [
          { key: "Server", value: "" },
          { key: "X-Powered-By", value: "" },
          { key: "X-Nextjs-Cache", value: "" },
          { key: "X-React-Server-Component", value: "" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },

          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  poweredByHeader: false
};

export default nextConfig;
