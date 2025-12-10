import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Get custom cache control from form data (in seconds)
  const cacheControlMaxAge = formData.get("cacheControlMaxAge") as string;
  const maxAge = cacheControlMaxAge ? parseInt(cacheControlMaxAge, 10) : 3600;

  try {
    // Upload to Vercel Blob with custom cache control
    const blob = await put(file.name, file, {
      access: "public",
      // This sets the Cache-Control header on the blob
      // Vercel respects this when serving the file
      cacheControlMaxAge: maxAge,
    });

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      cacheControlMaxAge: maxAge,
    });
  } catch (error) {
    console.error("Blob upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload to blob" },
      { status: 500 }
    );
  }
}

