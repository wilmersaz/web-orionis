import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Titillium_Web } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import 'highlight.js/styles/monokai.css';

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-titillium-web',
});

export const metadata: Metadata = {
  title: 'Orionis Framework',
  description:
    'A high-performance, async-first Python framework built for ambitious applications.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={titilliumWeb.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}