import { Seperator, Text } from '@chatse/toolkit';
import { BreadCrumbsForPath } from '../../../../src/components';
import { ActionBar } from './action-bar';
import { ActiveFilters } from './active-filters';

// export const revalidate = 0;

const ClubsPage = () => {
  return (
    <article className="flex-1 px-6 py-4">
      <BreadCrumbsForPath className="mb-4" />
      <Text variant="title">Clubs</Text>
      <ActionBar />
      <Seperator />
      <ActiveFilters />
    </article>
  );
};

export default ClubsPage;
