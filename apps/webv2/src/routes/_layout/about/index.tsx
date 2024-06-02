import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/about/')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: () => <div>Hello from About!</div>,
});
