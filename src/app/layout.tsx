import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root (optional) or just to satisfy
// Next.js requirements when using a [locale] segment, this root layout is required.
export default function RootLayout({children}: Props) {
  return children;
}
