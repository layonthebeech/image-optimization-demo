export function ConfigDisplay() {
  // These represent the DEFAULTS from Next.js
  // Your actual config may override these
  const defaults = {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    quality: 75,
  };

  const optimized = {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 1080, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 60,
    quality: 75,
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Default Config */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="font-medium text-zinc-400 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
          Next.js Defaults
        </h3>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-zinc-500 mb-1">formats</dt>
            <dd className="font-mono text-rose-400">
              {JSON.stringify(defaults.formats)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 mb-1">deviceSizes</dt>
            <dd className="font-mono text-rose-400 text-xs break-all">
              [{defaults.deviceSizes.join(", ")}]
            </dd>
            <dd className="text-zinc-500 text-xs mt-1">
              {defaults.deviceSizes.length} variations
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 mb-1">imageSizes</dt>
            <dd className="font-mono text-rose-400 text-xs">
              [{defaults.imageSizes.join(", ")}]
            </dd>
            <dd className="text-zinc-500 text-xs mt-1">
              {defaults.imageSizes.length} variations
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 mb-1">quality</dt>
            <dd className="font-mono">{defaults.quality}</dd>
          </div>
        </dl>
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <p className="text-zinc-500 text-xs">
            Max transformations per image:
          </p>
          <p className="text-2xl font-bold text-rose-400">
            {defaults.formats.length *
              (defaults.deviceSizes.length + defaults.imageSizes.length)}
          </p>
        </div>
      </div>

      {/* Optimized Config */}
      <div className="bg-zinc-900 border border-emerald-900/50 rounded-xl p-6">
        <h3 className="font-medium text-emerald-400 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Recommended Config
        </h3>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-zinc-500 mb-1">formats</dt>
            <dd className="font-mono text-emerald-400">
              {JSON.stringify(optimized.formats)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 mb-1">deviceSizes</dt>
            <dd className="font-mono text-emerald-400 text-xs break-all">
              [{optimized.deviceSizes.join(", ")}]
            </dd>
            <dd className="text-zinc-500 text-xs mt-1">
              {optimized.deviceSizes.length} variations
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 mb-1">imageSizes</dt>
            <dd className="font-mono text-emerald-400 text-xs">
              [{optimized.imageSizes.join(", ")}]
            </dd>
            <dd className="text-zinc-500 text-xs mt-1">
              {optimized.imageSizes.length} variations
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 mb-1">quality</dt>
            <dd className="font-mono">{optimized.quality}</dd>
          </div>
        </dl>
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <p className="text-zinc-500 text-xs">
            Max transformations per image:
          </p>
          <p className="text-2xl font-bold text-emerald-400">
            {optimized.formats.length *
              (optimized.deviceSizes.length + optimized.imageSizes.length)}
          </p>
        </div>
      </div>
    </div>
  );
}

