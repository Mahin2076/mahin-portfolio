import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mahin-builds.bharathwajmahin.chatgpt.site'),
  title: 'Mahin Bharathwaj — AI, Robotics, and Hardware',
  description:
    'Mahin Bharathwaj is a student builder working across AI, robotics, hardware, and community.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Mahin Bharathwaj — AI, Robotics, and Hardware',
    description:
      'A student builder making ambitious ideas feel simple, useful, and real.',
    type: 'website',
    images: [
      {
        url: 'https://mahin-builds.bharathwajmahin.chatgpt.site/og.png',
        width: 1664,
        height: 936,
        alt: 'Mahin Bharathwaj portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahin Bharathwaj — AI, Robotics, and Hardware',
    description:
      'A student builder making ambitious ideas feel simple, useful, and real.',
    images: ['https://mahin-builds.bharathwajmahin.chatgpt.site/og.png'],
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
