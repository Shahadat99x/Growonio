import type { Metadata } from "next";
import { ReactNode } from "react";

import { siteConfig } from "@/lib/config";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  category: "business",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

// Since we have a `not-found.tsx` page on the root (optional) or just to satisfy
// Next.js requirements when using a [locale] segment, this root layout is required.
export default function RootLayout({ children }: Props) {
  return children;
}
