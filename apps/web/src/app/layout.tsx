import '../styles/globals.css';

import { type ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import NextTopLoader from 'nextjs-toploader';

import { cn } from '@chatse/toolkit';
import { RootProviders } from './root-providers';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en-US" dir="ltr">
      <body className={cn('flex min-h-screen flex-col font-sans antialiased', GeistSans.variable)}>
        <RootProviders>{children}</RootProviders>
        <NextTopLoader showSpinner={false} shadow={false} />
      </body>
    </html>
  );
};

export default RootLayout;
