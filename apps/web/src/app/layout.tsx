import '../styles/globals.css';

import { ReactNode } from 'react';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@chatse/toolkit';
import { RootProviders } from './root-providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en-US" dir="ltr">
      <body className={cn('flex min-h-screen flex-col font-sans antialiased', fontSans.variable)}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
};

export default RootLayout;
