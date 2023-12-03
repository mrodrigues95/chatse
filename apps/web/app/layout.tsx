'use client';

import '../src/styles/globals.css';

import { ReactNode } from 'react';
import { Inter as FontSans } from 'next/font/google';
import { useLocale } from 'react-aria';

import { cn } from '@chatse/toolkit';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { locale, direction } = useLocale();

  return (
    <html lang={locale} dir={direction}>
      <body className={cn('flex min-h-screen flex-col font-sans antialiased', fontSans.variable)}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
