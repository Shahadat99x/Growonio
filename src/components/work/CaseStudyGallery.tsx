import Image from "next/image";

import {
  buildCloudinaryImageUrl,
  isCloudinaryUrl,
  isLocalAssetUrl,
} from "@/lib/cloudinary";
import type { LocalizedWorkItemGalleryItem } from "@/types/content";
import { cn } from "@/lib/utils";

type CaseStudyGalleryProps = {
  items: LocalizedWorkItemGalleryItem[];
  projectTitle: string;
};

function getGalleryImageAlt(
  item: LocalizedWorkItemGalleryItem,
  projectTitle: string,
  index: number,
) {
  const customAlt = item.alt?.trim();
  if (customAlt) {
    return customAlt;
  }

  return `${projectTitle} gallery image ${index + 1}`;
}

export function CaseStudyGallery({
  items,
  projectTitle,
}: CaseStudyGalleryProps) {
  const visibleItems = items.filter((item) => item.image_url.trim().length > 0);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        visibleItems.length === 1 ? "grid-cols-1" : "md:grid-cols-2",
      )}
    >
      {visibleItems.map((item, index) => {
        const imageUrl = item.image_url;
        const optimizedSrc = isCloudinaryUrl(imageUrl)
          ? buildCloudinaryImageUrl(imageUrl, {
              width: index === 0 && visibleItems.length >= 3 ? 1600 : 1200,
              height: index === 0 && visibleItems.length >= 3 ? 1100 : 900,
              crop: "fill",
              gravity: "auto",
            })
          : imageUrl;
        const isOptimizedImage = isCloudinaryUrl(imageUrl) || isLocalAssetUrl(imageUrl);

        return (
          <figure
            key={item.id}
            className={cn(
              "group overflow-hidden rounded-[1.75rem] border border-border/60 bg-muted/30 shadow-sm shadow-black/5",
              visibleItems.length >= 3 && index === 0 ? "md:col-span-2" : "",
            )}
          >
            <div
              className={cn(
                "relative w-full overflow-hidden",
                visibleItems.length === 1
                  ? "aspect-[16/10]"
                  : visibleItems.length >= 3 && index === 0
                    ? "aspect-[16/10]"
                    : "aspect-[4/3]",
              )}
            >
              {isOptimizedImage ? (
                <Image
                  alt={getGalleryImageAlt(item, projectTitle, index)}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  fill
                  sizes={
                    visibleItems.length === 1
                      ? "(max-width: 1280px) 100vw, 1200px"
                      : visibleItems.length >= 3 && index === 0
                        ? "(max-width: 768px) 100vw, 1200px"
                        : "(max-width: 768px) 100vw, 50vw"
                  }
                  src={optimizedSrc}
                  unoptimized={isCloudinaryUrl(imageUrl)}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={getGalleryImageAlt(item, projectTitle, index)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  src={imageUrl}
                />
              )}
            </div>
          </figure>
        );
      })}
    </div>
  );
}
