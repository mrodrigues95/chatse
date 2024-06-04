import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { z } from 'zod';

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

export const Route = createFileRoute('/_layout/_auth')({
  validateSearch: z.object({ redirect: z.string().optional().catch('') }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isLoggedIn) {
      throw redirect({ to: search.redirect || '/clubs' });
    }
  },
  component: AuthLayout,
});
