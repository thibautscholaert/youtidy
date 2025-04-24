import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'YouTidy - Organize Your YouTube Likes',
  description: "YouTidy helps you organize and rediscover the YouTube videos you've liked over the years.",
  metadataBase: new URL('https://youtidy.app'), // Replace with your domain
  keywords: ['YouTube', 'video organizer', 'liked videos', 'YouTube history', 'playlist manager', 'nostalgia', 'Google Takeout'],
  openGraph: {
    title: 'YouTidy',
    description: "Rediscover your liked YouTube videos and explore your watch history like never before.",
    url: 'https://youtidy.app',
    siteName: 'YouTidy',
    images: [
      {
        url: 'https://youtidy.app/og-image.png', // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: 'YouTidy - Your YouTube Likes Organized',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTidy',
    description: "Organize and revisit your favorite YouTube moments with YouTidy.",
    creator: '@youtidyapp', // Optional: your Twitter handle
    images: ['https://youtidy.app/og-image.png'], // Replace with your image
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
