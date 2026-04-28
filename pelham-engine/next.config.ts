import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Don't leak the framework in response headers in production.
  poweredByHeader: false,
  // Fail the production build on type or lint errors so broken code
  // never reaches Vercel/Netlify.
  typescript: {
    ignoreBuildErrors: false,
  },
  // Apply baseline security headers to every route. Both Vercel and
  // Netlify honour Next.js `headers()` output.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
