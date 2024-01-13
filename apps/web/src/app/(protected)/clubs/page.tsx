import { type ReactNode } from 'react';

import { Text } from '@chatse/toolkit';

export const revalidate = 0;

const ClubsPage = async ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex-1 bg-slate-50 px-6 py-4">
      <Text variant="title">Clubs</Text>
      {children}
    </section>
  );
};

export default ClubsPage;
