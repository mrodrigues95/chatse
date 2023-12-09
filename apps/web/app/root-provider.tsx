'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { RouterProvider } from 'react-aria-components';

export const RootProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
};
