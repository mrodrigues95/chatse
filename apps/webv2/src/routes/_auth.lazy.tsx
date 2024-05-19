import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

import { Footer } from './_auth/-footer';

const AuthLayout = () => (
  <main className="flex flex-1 flex-col p-4 lg:p-8">
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </section>
    <Footer />
  </main>
);

export const Route = createLazyFileRoute('/_auth')({
  component: AuthLayout,
});
