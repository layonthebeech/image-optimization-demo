import Image from "next/image";
import { ImageCard } from "@/components/ImageCard";
import { ConfigDisplay } from "@/components/ConfigDisplay";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Next.js Image Optimization
            <span className="text-emerald-400 ml-2">Demo</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Understanding how image transformations affect your Vercel bill
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Current Config Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Current Configuration
          </h2>
          <ConfigDisplay />
        </section>

        {/* Local Images Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Local Images (from /public)
          </h2>
          <p className="text-zinc-400 mb-6 text-sm">
            Local images in your /public folder are optimized the same way as remote images.
            Check the Network tab to see the /_next/image requests.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Local Hero */}
            <ImageCard
              title="Hero Image"
              description="800×600 local image with default optimization"
              src="/sample-hero.jpg"
              alt="Sample hero"
              width={400}
              height={300}
              codeExample={`<Image
  src="/sample-hero.jpg"
  width={400}
  height={300}
  alt="..."
/>`}
            />

            {/* Local Square */}
            <ImageCard
              title="Square Image"
              description="400×400 local image"
              src="/sample-square.jpg"
              alt="Sample square"
              width={300}
              height={300}
              codeExample={`<Image
  src="/sample-square.jpg"
  width={300}
  height={300}
  alt="..."
/>`}
            />

            {/* Local Thumbnail */}
            <ImageCard
              title="Thumbnail"
              description="200×200 small image - still optimized"
              src="/sample-thumbnail.jpg"
              alt="Sample thumbnail"
              width={200}
              height={200}
              codeExample={`<Image
  src="/sample-thumbnail.jpg"
  width={200}
  height={200}
  alt="..."
/>`}
            />

            {/* Local Large - Unoptimized */}
            <ImageCard
              title="Large (unoptimized)"
              description="1920×1080 served as-is, ~310KB vs optimized"
              src="/sample-large.jpg"
              alt="Sample large"
              width={400}
              height={225}
              unoptimized
              codeExample={`<Image
  src="/sample-large.jpg"
  width={400}
  height={225}
  unoptimized={true}
  alt="..."
/>`}
            />
          </div>

          {/* File size comparison */}
          <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="font-medium text-zinc-300 mb-4">📁 Local Image File Sizes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-zinc-500">sample-hero.jpg</p>
                <p className="font-mono">~76 KB</p>
              </div>
              <div>
                <p className="text-zinc-500">sample-square.jpg</p>
                <p className="font-mono">~26 KB</p>
              </div>
              <div>
                <p className="text-zinc-500">sample-thumbnail.jpg</p>
                <p className="font-mono">~5 KB</p>
              </div>
              <div>
                <p className="text-zinc-500">sample-large.jpg</p>
                <p className="font-mono text-amber-400">~310 KB</p>
              </div>
            </div>
            <p className="text-zinc-500 text-xs mt-4">
              💡 The large image served unoptimized demonstrates why optimization matters for big files.
            </p>
          </div>
        </section>

        {/* Remote Images Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Remote Images (require remotePatterns)
          </h2>
          <p className="text-zinc-400 mb-6 text-sm">
            Remote images need to be allow-listed in next.config.ts. Each combination of 
            format × quality × width creates a unique cached transformation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Standard Image */}
            <ImageCard
              title="Default Settings"
              description="Uses config defaults for format, quality, and responsive sizing"
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"
              alt="Abstract gradient"
              width={400}
              height={300}
              codeExample={`<Image
  src="/image.jpg"
  width={400}
  height={300}
  alt="..."
/>`}
            />

            {/* With explicit quality */}
            <ImageCard
              title="Quality 75"
              description="Explicit quality setting - if you mix 75 and 80, you double transformations"
              src="https://images.unsplash.com/photo-1557683316-973673baf926?w=800"
              alt="Gradient blue"
              width={400}
              height={300}
              quality={75}
              codeExample={`<Image
  src="/image.jpg"
  width={400}
  height={300}
  quality={75}  // Explicit
  alt="..."
/>`}
            />

            {/* With different quality */}
            <ImageCard
              title="Quality 80"
              description="Same image at quality 80 = separate transformation cached"
              src="https://images.unsplash.com/photo-1557683316-973673baf926?w=800"
              alt="Gradient blue"
              width={400}
              height={300}
              quality={80}
              codeExample={`<Image
  src="/image.jpg"
  width={400}
  height={300}
  quality={80}  // Different!
  alt="..."
/>`}
            />

            {/* Unoptimized */}
            <ImageCard
              title="Unoptimized"
              description="Skips transformation entirely - no Vercel billing, but larger files"
              src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800"
              alt="Abstract shapes"
              width={400}
              height={300}
              unoptimized
              codeExample={`<Image
  src="/image.jpg"
  width={400}
  height={300}
  unoptimized={true}
  alt="..."
/>`}
            />

            {/* With sizes prop */}
            <ImageCard
              title="Responsive (sizes)"
              description="Uses deviceSizes from config - more breakpoints = more transformations"
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800"
              alt="Colorful gradient"
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, 50vw"
              codeExample={`<Image
  src="/image.jpg"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="..."
/>`}
            />

            {/* Priority (preload) */}
            <ImageCard
              title="Priority Loading"
              description="Preloads the image - same transformation rules apply"
              src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800"
              alt="Purple abstract"
              width={400}
              height={300}
              priority
              codeExample={`<Image
  src="/image.jpg"
  width={400}
  height={300}
  priority={true}
  alt="..."
/>`}
            />
          </div>
        </section>

        {/* Cost Impact Visualization */}
        <section>
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            Transformation Cost Multiplier
          </h2>
          <p className="text-zinc-400 mb-6 text-sm">
            Example: How configuration choices multiply your transformation
            count
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before optimization */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-medium text-rose-400 mb-4">
                ❌ Before Optimization
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Formats</span>
                  <span>AVIF + WebP = 2×</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Qualities</span>
                  <span>75 + 80 = 2×</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Device Sizes</span>
                  <span>8 widths = 8×</span>
                </div>
                <hr className="border-zinc-800" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Per image</span>
                  <span className="text-rose-400">
                    32 transformations
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>100,000 images</span>
                  <span>3.2M transformations</span>
                </div>
              </div>
            </div>

            {/* After optimization */}
            <div className="bg-zinc-900 border border-emerald-900/50 rounded-xl p-6">
              <h3 className="font-medium text-emerald-400 mb-4">
                ✓ After Optimization
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Formats</span>
                  <span>WebP only = 1×</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Qualities</span>
                  <span>75 only = 1×</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Device Sizes</span>
                  <span>6 widths = 6×</span>
                </div>
                <hr className="border-zinc-800" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Per image</span>
                  <span className="text-emerald-400">6 transformations</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>100,000 images</span>
                  <span>600K transformations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-6">
            <p className="text-emerald-300 font-medium">
              💡 Result: 81% reduction in transformations
            </p>
            <p className="text-zinc-400 text-sm mt-2">
              By limiting formats to WebP and standardizing quality, you can
              dramatically reduce your image optimization costs with minimal
              impact on visual quality.
            </p>
          </div>
        </section>

        {/* Quick Reference */}
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Quick Reference: next.config.ts
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="bg-zinc-800/50 px-4 py-2 border-b border-zinc-800">
              <span className="text-zinc-400 text-sm font-mono">
                next.config.ts
              </span>
            </div>
            <pre className="p-6 text-sm overflow-x-auto">
              <code className="text-zinc-300">{`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Limit to WebP only (cuts transformations ~50%)
    formats: ["image/webp"],
    
    // Reduce device sizes to actual breakpoints
    deviceSizes: [640, 750, 1080, 1920, 2048, 3840],
    
    // Reduce image sizes to what you use
    imageSizes: [16, 32, 64, 128, 256],
    
    // Allow external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-cdn.com",
      },
    ],
  },
};

export default nextConfig;`}</code>
            </pre>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          <p>
            Open DevTools → Network tab to inspect actual image requests and
            transformations
          </p>
        </div>
      </footer>
    </main>
  );
}
