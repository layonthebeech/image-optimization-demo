import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // CUSTOM HEADERS
  // ============================================
  // Set Cache-Control headers for different image types
  async headers() {
    return [
      // Static images in /public folder
      {
        source: "/:path*.(jpg|jpeg|png|gif|webp|avif|ico|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, must-revalidate", // 60 seconds
          },
        ],
      },
      // Next.js optimized images (/_next/image)
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, must-revalidate", // 60 seconds
          },
        ],
      },
    ];
  },

  images: {
    // ============================================
    // FORMAT CONFIGURATION
    // ============================================
    // DEFAULT: ['image/avif', 'image/webp']
    // The order matters - first supported format wins
    // AVIF = better compression, less browser support
    // WebP = good compression, broad browser support
    //
    // RECOMMENDATION: Use only WebP to reduce transformations by ~50%
    formats: ["image/avif", "image/webp"],

    // ============================================
    // DEVICE SIZES (for responsive images)
    // ============================================
    // DEFAULT: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    // These are used when the image has `sizes` prop
    // Each size = potential transformation variant
    //
    // RECOMMENDATION: Reduce to match your actual breakpoints
    deviceSizes: [640, 750, 1080, 1920, 2048, 3840],

    // ============================================
    // IMAGE SIZES (for fixed-size images)
    // ============================================
    // DEFAULT: [16, 32, 48, 64, 96, 128, 256, 384]
    // Used for images without `sizes` prop or with fixed dimensions
    //
    // RECOMMENDATION: Reduce to only sizes you actually use
    imageSizes: [16, 32, 64, 128, 256],

    // ============================================
    // QUALITY (not configurable globally pre-Next.js 14)
    // ============================================
    // In Next.js 14+, you can set a default quality
    // DEFAULT: 75
    // Range: 1-100
    //
    // NOTE: Individual <Image> components can override this
    // To enforce consistency, audit your codebase for quality props

    // ============================================
    // REMOTE PATTERNS (required for external images)
    // ============================================
    // Define which external domains can be optimized
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // Vercel Blob storage
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      // Example: AWS S3 bucket pattern
      // {
      //   protocol: 'https',
      //   hostname: '*.s3.amazonaws.com',
      // },
      // Example: Notion's AWS hosting
      // {
      //   protocol: 'https',
      //   hostname: 's3.us-west-2.amazonaws.com',
      //   pathname: '/secure.notion-static.com/**',
      // },
    ],

    // ============================================
    // CONTENT DISPOSITION TYPE
    // ============================================
    // DEFAULT: 'inline'
    // Options: 'inline' | 'attachment'
    // contentDispositionType: 'inline',

    // ============================================
    // MINIMUM CACHE TTL
    // ============================================
    // DEFAULT: 60 (seconds)
    // How long to cache optimized images in memory
    // Note: CDN cache TTL is separate (max 31 days on Vercel)
    minimumCacheTTL: 30,

    // ============================================
    // DANGEROUS: Allow SVG (disabled by default)
    // ============================================
    // SVGs can contain scripts - enable with caution
    // dangerouslyAllowSVG: false,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // ============================================
    // UNOPTIMIZED (disable optimization entirely)
    // ============================================
    // DEFAULT: false
    // Set to true to serve all images without optimization
    // Useful for static exports or when using external CDN
    // unoptimized: false,
  },
};

export default nextConfig;
