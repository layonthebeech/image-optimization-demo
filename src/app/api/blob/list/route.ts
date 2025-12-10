import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list();

    return NextResponse.json({
      blobs: blobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      })),
    });
  } catch (error) {
    console.error("Blob list error:", error);
    return NextResponse.json(
      { error: "Failed to list blobs" },
      { status: 500 }
    );
  }
}

