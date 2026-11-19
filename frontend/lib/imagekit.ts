/**
 * ImageKit and CDN Media Helper for Rida Optical
 */

const IMAGEKIT_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT || "https://ik.imagekit.io/ridaoptical";
const FALLBACK_WP_ORIGIN = "https://ridaoptical.com/wp-content/uploads/";

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "webp" | "avif" | "jpg";
  crop?: "maintain_ratio" | "force" | "at_least";
}

/**
 * Returns optimized image URL.
 * Handles:
 * 1. Full original URL (https://ridaoptical.com/wp-content/uploads/...)
 * 2. Relative upload paths (2025/07/1000424554-scaled.jpg)
 * 3. Fallback placeholder if missing
 */
export function getOptimizedImageUrl(
  src: string | undefined | null,
  options: ImageTransformOptions = {}
): string {
  if (!src) {
    return "/images/placeholder-frame.svg";
  }

  // If already an absolute external URL that isn't ridaoptical, return as is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    // If it's a ridaoptical.com upload URL, we can optimize it or serve via CDN
    if (src.includes("ridaoptical.com/wp-content/uploads/")) {
      const cleanPath = src.split("/wp-content/uploads/")[1];
      if (process.env.NEXT_PUBLIC_USE_IMAGEKIT === "true" && IMAGEKIT_ENDPOINT) {
        return buildImageKitUrl(cleanPath, options);
      }
      return src;
    }
    return src;
  }

  // If it's a relative path starting with slash (e.g. /images/...)
  if (src.startsWith("/")) {
    return src;
  }

  // It's a relative WordPress upload path (e.g. '2025/07/...')
  if (process.env.NEXT_PUBLIC_USE_IMAGEKIT === "true" && IMAGEKIT_ENDPOINT) {
    return buildImageKitUrl(src, options);
  }

  return `${FALLBACK_WP_ORIGIN}${src}`;
}

function buildImageKitUrl(relativePath: string, options: ImageTransformOptions): string {
  const trParams: string[] = [];
  if (options.width) trParams.push(`w-${options.width}`);
  if (options.height) trParams.push(`h-${options.height}`);
  if (options.quality) trParams.push(`q-${options.quality}`);
  trParams.push(`f-${options.format || "auto"}`);

  const transformString = trParams.length > 0 ? `tr:${trParams.join(",")}` : "";
  const cleanPath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;

  if (transformString) {
    return `${IMAGEKIT_ENDPOINT}/${transformString}/${cleanPath}`;
  }
  return `${IMAGEKIT_ENDPOINT}/${cleanPath}`;
}
