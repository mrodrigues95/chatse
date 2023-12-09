import { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode }) => (
  <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
);

export default LoginLayout;
