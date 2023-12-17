import '../styles/globals.css';

import { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';

import { cn } from '@chatse/toolkit';
import { RootProviders } from './root-providers';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en-US" dir="ltr">
      <body className={cn('flex min-h-screen flex-col font-sans antialiased', GeistSans.variable)}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
};

export default RootLayout;
