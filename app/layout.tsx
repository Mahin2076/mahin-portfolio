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
  title: 'Mahin Bharathwaj — Builder, Researcher, 10× Hackathon Winner',
  description: 'Mahin Bharathwaj builds ambitious systems across AI, robotics, hardware, and community.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Mahin Bharathwaj — I build things that shouldn’t work.',
    description: '10× hackathon winner building across AI, robotics, hardware, and community.',
    type: 'website',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Mahin Bharathwaj portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahin Bharathwaj — I build things that shouldn’t work.',
    description: '10× hackathon winner building across AI, robotics, hardware, and community.',
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
