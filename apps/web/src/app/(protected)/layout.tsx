import { type ReactNode } from 'react';

import { Nav } from '../../components';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col">
      <main className="flex flex-1">
        <Nav />
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
