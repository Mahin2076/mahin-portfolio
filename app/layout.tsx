import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Mahin Bharathwaj — Builder',
  description:
    'Mahin Bharathwaj is a student builder working across AI, robotics, hardware, and community.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Mahin Bharathwaj — Builder',
    description:
      'A student builder making ambitious ideas feel simple, useful, and real.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1672,
        height: 941,
        alt: 'Mahin Bharathwaj portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahin Bharathwaj — Builder',
    description:
      'A student builder making ambitious ideas feel simple, useful, and real.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
