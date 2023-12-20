'use client';

import { type ReactNode } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import { useEnvironment } from '../utils/relay/environment';

export const RootProviders = ({ children }: { children: ReactNode }) => {
  const environment = useEnvironment();
  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>;
};
