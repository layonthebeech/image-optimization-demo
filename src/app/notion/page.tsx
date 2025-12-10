import Image from "next/image";

const NOTION_IMAGE_URL =
  "https://s3-us-west-2.amazonaws.com/public.notion-static.com/d5c2bba9-9751-48f1-ad65-ffd6874d2872/e8065168-9b7c-4bc0-b672-7bc5bcc7ddd1.png";

export default function NotionImagePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Notion S3 Image
            <span className="text-orange-400 ml-2">Test</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Testing upstream cache behavior from Notion&apos;s S3 bucket
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Raw S3 URL */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Raw S3 URL (no optimization)
          </h2>
          
          <p className="text-sm text-zinc-400 mb-4">
            Direct from S3 — check headers to see if AWS sets Cache-Control
          </p>

          <a
            href={NOTION_IMAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:text-amber-300 font-mono break-all"
          >
            {NOTION_IMAGE_URL}
          </a>

          <div className="mt-4 relative aspect-video bg-zinc-800 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NOTION_IMAGE_URL}
              alt="Notion S3 image - raw"
              className="object-contain w-full h-full"
            />
            <div className="absolute bottom-2 left-2 bg-zinc-900/90 backdrop-blur px-2 py-1 rounded text-xs">
              Raw &lt;img&gt; tag — no Next.js optimization
            </div>
          </div>
        </section>

        {/* Optimized via Next.js */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Via Next.js Image Optimization
          </h2>
          
          <p className="text-sm text-zinc-400 mb-4">
            Through <code className="text-emerald-400">/_next/image</code> — 
            Vercel sets Cache-Control based on minimumCacheTTL (or defaults if upstream has none)
          </p>

          <div className="mt-4 relative aspect-video bg-zinc-800 rounded-lg overflow-hidden">
            <Image
              src={NOTION_IMAGE_URL}
              alt="Notion S3 image - optimized"
              fill
              className="object-contain"
            />
            <div className="absolute bottom-2 left-2 bg-zinc-900/90 backdrop-blur px-2 py-1 rounded text-xs">
              Next.js Image — check /_next/image headers
            </div>
          </div>
        </section>

        {/* Different quality settings */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            Quality Variations (transformation multiplier)
          </h2>
          
          <p className="text-sm text-zinc-400 mb-4">
            Same image at different qualities = separate cached transformations
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden">
              <Image
                src={NOTION_IMAGE_URL}
                alt="Quality 75"
                fill
                className="object-contain"
                quality={75}
              />
              <div className="absolute bottom-2 left-2 bg-zinc-900/90 backdrop-blur px-2 py-1 rounded text-xs">
                quality=75
              </div>
            </div>
            <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden">
              <Image
                src={NOTION_IMAGE_URL}
                alt="Quality 80"
                fill
                className="object-contain"
                quality={80}
              />
              <div className="absolute bottom-2 left-2 bg-zinc-900/90 backdrop-blur px-2 py-1 rounded text-xs">
                quality=80
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-6">
          <h3 className="font-medium text-amber-300 mb-3">🔍 How to check headers</h3>
          <ol className="text-sm text-zinc-400 space-y-2 list-decimal list-inside">
            <li>Open DevTools → Network tab</li>
            <li>Reload the page</li>
            <li>Click on the raw S3 request — check Response Headers</li>
            <li>Click on the /_next/image request — compare headers</li>
            <li>Look for <code className="text-amber-400">Cache-Control</code> and <code className="text-amber-400">Age</code></li>
          </ol>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          <a href="/" className="text-orange-400 hover:text-orange-300">
            ← Back to main demo
          </a>
        </div>
      </footer>
    </main>
  );
}

