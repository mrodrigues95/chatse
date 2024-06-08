import { createLazyFileRoute } from '@tanstack/react-router';

import { Seperator, Text } from '@chatse/toolkit';
import { ActionBar } from './-action-bar';

const Clubs = () => (
  <article className="flex-1">
    {/* <BreadCrumbsForPath className="mb-4" /> */}
    <Text variant="title">Clubs</Text>
    <ActionBar />
    <Seperator />
    {/* <ActiveFilters /> */}
  </article>
);

export const Route = createLazyFileRoute('/_layout/_protected/clubs/')({
  component: Clubs,
});
