/**
 * @file
 * @license MIT
 *
 * Copyright (c) 2024 Mustafa Trunkwala
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';
import BottomDock from '@/components/BottomDock';
import DotPattern from '@/components/magicui/dot-pattern';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Travel Buddy',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_WEBSITE_URL}`),
  description:
    'A travel itinerary planner, built with Next.js and Tailwind CSS, owner Mustafa Trunkwala',
  authors: [
    {
      name: 'Mustafa Trunkwala',
    },
  ],
  openGraph: {
    title: 'Travel Buddy',
    description:
      'A travel itinerary planner, built with Next.js and Tailwind CSS, owner Mustafa Trunkwala',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/social-image.png`,
        type: 'image/png',
        width: 1280,
        height: 675,
        alt: 'Travel Buddy',
      },
      {
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/social-image.png`,
        width: 800,
        height: 418,
        alt: 'Travel Buddy',
      },
      {
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/social-image.png`,
        width: 400,
        height: 209,
        alt: 'Travel Buddy',
      },
      {
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/social-image.png`,
        width: 200,
        height: 104,
        alt: 'Travel Buddy',
      },
    ],
    siteName: 'Travel Buddy',
  },
  twitter: {
    title: 'Travel Buddy',
    description:
      'A travel itinerary planner, built with Next.js and Tailwind CSS, owner Mustafa Trunkwala',
    site: '@mustafatrunk',
    card: 'summary_large_image',
    creator: '@mustafatrunk',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/social-image.png`,
        alt: 'Travel Buddy',
      },
    ],
  },
  keywords: ['travel', 'itinerary', 'planner', 'vacation', 'trip'],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased py-1',
          inter.variable
        )}
      >
        <SessionProvider>
          <TooltipProvider>
            <DotPattern
              className={cn(
                '[mask-image:radial-gradient(900px_circle_at_center,white,transparent)] overflow-clip z-0'
              )}
            />
            {children}
            <BottomDock />
          </TooltipProvider>
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
