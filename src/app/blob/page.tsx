"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface BlobFile {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

export default function BlobPage() {
  const [blobs, setBlobs] = useState<BlobFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [cacheMaxAge, setCacheMaxAge] = useState(60);
  const [message, setMessage] = useState("");

  // Fetch existing blobs on load
  useEffect(() => {
    fetchBlobs();
  }, []);

  async function fetchBlobs() {
    try {
      const res = await fetch("/api/blob/list");
      const data = await res.json();
      if (data.blobs) {
        setBlobs(data.blobs);
      }
    } catch (error) {
      console.error("Failed to fetch blobs:", error);
    }
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cacheControlMaxAge", cacheMaxAge.toString());

    try {
      const res = await fetch("/api/blob/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setMessage(`Error: ${data.error}`);
      } else {
        setMessage(`Uploaded! Cache-Control max-age: ${data.cacheControlMaxAge}s`);
        fetchBlobs();
        form.reset();
      }
    } catch (error) {
      setMessage("Upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Vercel Blob
            <span className="text-violet-400 ml-2">Cache TTL Demo</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Upload images with custom Cache-Control max-age to see how upstream TTLs affect caching
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Upload Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            Upload to Blob Storage
          </h2>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Select Image
              </label>
              <input
                type="file"
                name="file"
                accept="image/*"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Cache-Control max-age (seconds)
              </label>
              <div className="flex gap-2">
                {[30, 60, 300, 3600, 86400].map((seconds) => (
                  <button
                    key={seconds}
                    type="button"
                    onClick={() => setCacheMaxAge(seconds)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      cacheMaxAge === seconds
                        ? "bg-violet-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}
                  >
                    {seconds < 60
                      ? `${seconds}s`
                      : seconds < 3600
                      ? `${seconds / 60}m`
                      : seconds < 86400
                      ? `${seconds / 3600}h`
                      : `${seconds / 86400}d`}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={cacheMaxAge}
                onChange={(e) => setCacheMaxAge(parseInt(e.target.value) || 60)}
                className="mt-2 w-32 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
            >
              {uploading ? "Uploading..." : "Upload to Blob"}
            </button>

            {message && (
              <p className={`text-sm ${message.includes("Error") ? "text-rose-400" : "text-emerald-400"}`}>
                {message}
              </p>
            )}
          </form>
        </section>

        {/* Info Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            How It Works
          </h2>

          <div className="space-y-4 text-sm text-zinc-400">
            <p>
              When you upload to Vercel Blob with a custom <code className="text-violet-400">cacheControlMaxAge</code>,
              the blob storage sets that as the <code className="text-violet-400">Cache-Control</code> header on the response.
            </p>

            <div className="bg-zinc-950 rounded-lg p-4 font-mono text-xs">
              <pre>{`await put(file.name, file, {
  access: "public",
  cacheControlMaxAge: ${cacheMaxAge}, // seconds
});`}</pre>
            </div>

            <p>
              When Next.js Image Optimization fetches this blob URL, it sees the upstream
              <code className="text-violet-400"> Cache-Control: max-age={cacheMaxAge}</code> header
              and respects it for its own caching decisions.
            </p>

            <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-4">
              <p className="text-amber-300">
                💡 This is why images from AWS S3 or other origins can have different cache
                behaviors — Vercel respects the upstream TTL.
              </p>
            </div>
          </div>
        </section>

        {/* Blobs List */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Uploaded Blobs
            <button
              onClick={fetchBlobs}
              className="ml-auto text-xs text-zinc-500 hover:text-zinc-300"
            >
              Refresh
            </button>
          </h2>

          {blobs.length === 0 ? (
            <p className="text-zinc-500 text-sm">No blobs uploaded yet. Upload an image above!</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {blobs.map((blob) => (
                <div
                  key={blob.url}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
                >
                  <div className="relative aspect-video bg-zinc-800">
                    <Image
                      src={blob.url}
                      alt={blob.pathname}
                      fill
                      className="object-cover"
                      unoptimized // Show raw blob, not optimized
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-xs text-zinc-400 truncate">
                      {blob.pathname}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {(blob.size / 1024).toFixed(1)} KB •{" "}
                      {new Date(blob.uploadedAt).toLocaleString()}
                    </p>
                    <a
                      href={blob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-violet-400 hover:text-violet-300 mt-2 inline-block"
                    >
                      View raw (check headers in DevTools) →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Test with Next/Image */}
        {blobs.length > 0 && (
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Test with Next.js Image Optimization
            </h2>

            <p className="text-sm text-zinc-400 mb-4">
              These images go through <code className="text-emerald-400">/_next/image</code> —
              check the Network tab to see how the upstream cache headers affect the optimized response.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {blobs.slice(0, 2).map((blob) => (
                <div key={`optimized-${blob.url}`} className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden">
                  <Image
                    src={blob.url}
                    alt={blob.pathname}
                    fill
                    className="object-cover"
                    // This goes through Next.js optimization
                  />
                  <div className="absolute bottom-2 left-2 bg-zinc-900/90 backdrop-blur px-2 py-1 rounded text-xs">
                    Optimized via /_next/image
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          <p>
            <a href="/" className="text-violet-400 hover:text-violet-300">← Back to main demo</a>
          </p>
        </div>
      </footer>
    </main>
  );
}

