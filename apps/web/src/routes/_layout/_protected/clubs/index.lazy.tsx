import { createContext, startTransition, useContext, useId, useState, type ReactNode } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Pencil } from 'lucide-react';

import { Button, Seperator, Text } from '@chatse/toolkit';
import { Icon } from '../../../../components';
import { ActionBar } from './-action-bar';
import { ActiveFilters, type TFilterId, type TFilterOptionId } from './-active-filters';

interface CurrentFilter {
  id: TFilterId;
  initialOption: TFilterOptionId;
}

interface ClubsFilterContext {
  currentFilters: Array<CurrentFilter>;
  onAddFilter: (filter: TFilterId, option: TFilterOptionId) => void;
  onRemoveFilter: (id: TFilterId) => void;
  onClearFilters: () => void;
}

const ClubsFilterContext = createContext<ClubsFilterContext | null>(null);

const ClubsFilterProvider = ({ children }: { children: ReactNode }) => {
  const [currentFilterIds, setCurrentFilterIds] = useState<Set<CurrentFilter['id']>>(new Set());
  const [currentFilters, setCurrentFilters] = useState<Array<CurrentFilter>>([]);

  const onAddFilter = (id: TFilterId, option: TFilterOptionId) => {
    if (currentFilterIds.has(id)) {
      return;
    }

    startTransition(() => {
      setCurrentFilters(prev => [...prev, { id: id, initialOption: option }]);
      setCurrentFilterIds(prev => new Set(prev).add(id));
    });
  };

  const onRemoveFilter = (id: TFilterId) => {
    startTransition(() => {
      setCurrentFilters(prev => prev.filter(filter => filter.id !== id));
      setCurrentFilterIds(prev => {
        const val = new Set(prev);
        val.delete(id);
        return val;
      });
    });
  };

  const onClearFilters = () => {
    startTransition(() => {
      setCurrentFilters([]);
      setCurrentFilterIds(new Set());
    });
  };

  return (
    <ClubsFilterContext value={{ currentFilters, onAddFilter, onRemoveFilter, onClearFilters }}>
      {children}
    </ClubsFilterContext>
  );
};

export const useClubsFilters = () => useContext(ClubsFilterContext)!;

const Clubs = () => {
  const titleId = useId();

  return (
    <div className="flex-1 bg-slate-50/50 px-4 py-10">
      <section aria-labelledby={titleId} className="mx-auto w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Text id={titleId} variant="title">
            Clubs
          </Text>
          <Button variant="solidBlue">
            <Icon className="text-white/75" size="xs">
              <Pencil />
            </Icon>
            New
          </Button>
        </div>
        <ClubsFilterProvider>
          <ActionBar />
          <Seperator />
          <ActiveFilters />
        </ClubsFilterProvider>
      </section>
    </div>
  );
};

export const Route = createLazyFileRoute('/_layout/_protected/clubs/')({
  component: Clubs,
});
