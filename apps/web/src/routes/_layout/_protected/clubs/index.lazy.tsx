import { useId } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { CirclePlus, Plus } from 'lucide-react';

import { Button, Seperator, Text } from '@chatse/toolkit';
import { Icon } from '../../../../components';
import { ActionBar } from './-action-bar';

const Clubs = () => {
  const titleId = useId();

  return (
    <div className="flex-1 bg-slate-50/50 px-4 py-10">
      {/* <BreadCrumbsForPath className="mb-4" /> */}
      <section aria-labelledby={titleId} className="mx-auto w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Text id={titleId} variant="title">
            Clubs
          </Text>
          <Button variant="solidBlue" size="sm">
            <Icon>
              <CirclePlus />
            </Icon>
            New
          </Button>
        </div>
        <ActionBar />
        <Seperator />
        {/* <ActiveFilters /> */}
      </section>
    </div>
  );
};

export const Route = createLazyFileRoute('/_layout/_protected/clubs/')({
  component: Clubs,
});
