import { ReactNode } from 'react';

import { Button, Text } from '@chatse/toolkit';

const LoginLayout = ({ children }: { children: ReactNode }) => (
  <main className="flex flex-1 flex-col p-4 lg:p-8">
    {children}
    <footer className="flex shrink-0 flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
      <Text variant="p" as="span" className="text-sm font-semibold">
        New to Chatse?
      </Text>
      <Button variant="outline">Create an account</Button>
    </footer>
  </main>
);

export default LoginLayout;
