import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Make a Scene - A cogapp hackday game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-slate-200 h-screen ${inter.className}`}>
          {children}
        <Analytics />
      </body>
    </html>
  );
}
