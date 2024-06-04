import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/_protected/clubs/')({
  component: () => <div>Hello /_layout/_protected/clubs/!</div>,
});
