import type { PhotoAsset } from "@/lib/photos";
import { cn } from "@/lib/utils";

export function Photo({
  photo,
  priority = false,
  className,
}: {
  photo: PhotoAsset;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "low"}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
