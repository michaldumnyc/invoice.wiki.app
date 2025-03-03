/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Server", value: "" },
          { key: "X-Powered-By", value: "" },
          { key: "X-Nextjs-Cache", value: "" },
          { key: "X-React-Server-Component", value: "" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
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
