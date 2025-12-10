import Image from "next/image";

interface ImageCardProps {
  title: string;
  description: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  priority?: boolean;
  unoptimized?: boolean;
  sizes?: string;
  codeExample: string;
}

export function ImageCard({
  title,
  description,
  src,
  alt,
  width,
  height,
  quality,
  priority,
  unoptimized,
  sizes,
  codeExample,
}: ImageCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-700 transition-colors">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-zinc-800 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          unoptimized={unoptimized}
          sizes={sizes}
          className="object-cover w-full h-full"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {quality && (
            <span className="bg-zinc-900/90 backdrop-blur text-xs px-2 py-1 rounded-full">
              q={quality}
            </span>
          )}
          {unoptimized && (
            <span className="bg-amber-900/90 text-amber-300 backdrop-blur text-xs px-2 py-1 rounded-full">
              unoptimized
            </span>
          )}
          {priority && (
            <span className="bg-blue-900/90 text-blue-300 backdrop-blur text-xs px-2 py-1 rounded-full">
              priority
            </span>
          )}
          {sizes && (
            <span className="bg-purple-900/90 text-purple-300 backdrop-blur text-xs px-2 py-1 rounded-full">
              responsive
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-zinc-100">{title}</h3>
        <p className="text-zinc-400 text-sm mt-1">{description}</p>
        
        {/* Code Example */}
        <div className="mt-4 bg-zinc-950 rounded-lg p-3 overflow-x-auto">
          <pre className="text-xs text-zinc-400 font-mono">
            <code>{codeExample}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

