import { type ReactNode } from 'react';

import { Footer } from './footer';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-1 flex-col p-4 lg:p-8">
      <section className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-sm">{children}</div>
      </section>
      <footer className="flex shrink-0 flex-col items-center justify-center gap-4 sm:flex-row">
        <Footer />
      </footer>
    </main>
  );
};

export default AuthLayout;
