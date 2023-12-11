'use client';

import { ReactNode } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import { getCurrentEnvironment } from '../src/relay/environment';

export const RootProviders = ({ children }: { children: ReactNode }) => {
  const environment = getCurrentEnvironment();
  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>;
};
