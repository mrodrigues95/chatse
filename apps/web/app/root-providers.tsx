'use client';

import { ReactNode } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import { useEnvironment } from '../src/relay/environment';

export const RootProviders = ({ children }: { children: ReactNode }) => {
  const environment = useEnvironment();
  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>;
};
