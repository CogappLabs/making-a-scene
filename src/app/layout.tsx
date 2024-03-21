import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Making a Scene - A cogapp hackday game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Wrapping the children prop */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
