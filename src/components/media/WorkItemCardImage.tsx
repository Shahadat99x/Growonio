"use client";

import { useState } from "react";
import Image from "next/image";

import { buildCloudinaryImageUrl, isCloudinaryUrl, isLocalAssetUrl } from "@/lib/cloudinary";

type WorkItemCardImageProps = {
  alt: string;
  src: string | null;
  title: string;
};

export function WorkItemCardImage({ alt, src, title }: WorkItemCardImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),transparent_55%)] px-8 text-center">
        <p className="text-lg font-semibold tracking-tight text-foreground">{title}</p>
      </div>
    );
  }

  if (isCloudinaryUrl(src) || isLocalAssetUrl(src)) {
    const optimizedSrc = isCloudinaryUrl(src)
      ? buildCloudinaryImageUrl(src, {
          crop: "fill",
          gravity: "auto",
          height: 900,
          width: 1440,
        })
      : src;

    return (
      <>
        <Image
          alt={alt}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          fill
          loading="lazy"
          onError={() => setHasError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          src={optimizedSrc}
          unoptimized={isCloudinaryUrl(src)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
      </>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        onError={() => setHasError(true)}
        src={src}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
    </>
  );
}
