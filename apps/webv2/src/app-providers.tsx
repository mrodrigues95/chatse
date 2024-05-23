import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RelayEnvironmentProvider } from 'react-relay';

import { useEnvironment } from './utils/relay/environment';

export const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const env = useEnvironment();

  return (
    <QueryClientProvider client={queryClient}>
      <RelayEnvironmentProvider environment={env}>{children}</RelayEnvironmentProvider>
    </QueryClientProvider>
  );
};
