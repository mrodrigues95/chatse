import '@chatse/toolkit/styles/styles.css';

import { StrictMode } from 'react';
import { createRouter, ErrorComponent, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import { relayEnvironment } from './utils/relay/environment';

const router = createRouter({
  routeTree,
  // TODO: Create a more suitable fallback error component for general errors.
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: { relay: relayEnvironment },
  defaultPreload: 'intent',
  // Since we're using Relay, we don't want loader calls to ever be stale.
  // This will ensure that the loader is always called when the route is preloaded or visited.
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
