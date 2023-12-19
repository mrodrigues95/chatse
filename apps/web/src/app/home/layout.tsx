import { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex min-h-screen flex-col">
      <h1>Home</h1>
    </main>
  );
};

export default HomeLayout;
