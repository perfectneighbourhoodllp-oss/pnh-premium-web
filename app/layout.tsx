import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Premium Residences in Bangalore`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "A private collection of twenty of Bangalore's finest residences. Hand-selected, never advertised, offered by introduction.",
  openGraph: { type: 'website', siteName: SITE_NAME, url: SITE_URL },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Exact fonts from the original pages: Manrope (home) + Inter (property) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
