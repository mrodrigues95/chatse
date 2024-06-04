import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

const ProtectedLayout = () => (
  <div className="relative flex min-h-screen flex-1 flex-col">
    <main className="flex flex-1">
      {/* <Nav /> */}
      <Outlet />
    </main>
  </div>
);

export const Route = createFileRoute('/_layout/_protected')({
  beforeLoad: ({ context, location }) => {
    // TODO: Check for 401's that may happen after logging in.
    if (!context.auth.isLoggedIn) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: ProtectedLayout,
});
