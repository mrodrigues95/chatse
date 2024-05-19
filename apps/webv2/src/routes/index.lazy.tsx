import { createLazyFileRoute } from '@tanstack/react-router';

const Index = () => (
  <main className="relative flex min-h-screen flex-col">
    <h1>Chatse</h1>
    <section className="p-2 text-red-500">
      <h2>Test - Index Route</h2>
    </section>
  </main>
);

export const Route = createLazyFileRoute('/')({
  component: Index,
});
