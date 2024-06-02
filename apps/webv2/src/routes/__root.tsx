import { Suspense } from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { RelayEnvironmentProvider } from 'react-relay';
import { type Environment } from 'relay-runtime';

import { relayEnvironment } from '../utils/relay/environment';

const Root = () => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <div className="flex min-h-screen flex-col">
      <Suspense>
        <Outlet />
      </Suspense>
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  </RelayEnvironmentProvider>
);

// TODO: https://github.com/TanStack/router/discussions/549
export const Route = createRootRouteWithContext<{
  relay: Environment;
}>()({ component: Root });
