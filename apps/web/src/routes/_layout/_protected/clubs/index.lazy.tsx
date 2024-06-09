import { createLazyFileRoute } from '@tanstack/react-router';

import { Seperator, Text } from '@chatse/toolkit';
import { ActionBar } from './-action-bar';

const Clubs = () => (
  <div className="flex-1 bg-slate-50/50 px-4 py-10">
    {/* <BreadCrumbsForPath className="mb-4" /> */}
    <section className="mx-auto w-full max-w-6xl">
      <Text variant="title">Clubs</Text>
      <ActionBar />
      <Seperator />
      {/* <ActiveFilters /> */}
    </section>
  </div>
);

export const Route = createLazyFileRoute('/_layout/_protected/clubs/')({
  component: Clubs,
});
