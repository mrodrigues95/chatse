import { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-xl font-bold tracking-tight text-slate-900">Sign In</h1>
      {children}
    </main>
  );
};

export default LoginLayout;
