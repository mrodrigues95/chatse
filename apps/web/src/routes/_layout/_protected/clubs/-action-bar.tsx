import { useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { Filter, Search } from 'lucide-react';

import { IconButton, Input } from '@chatse/toolkit';
import { SelectFilterDropdown } from './-select-filter-dropdown';

export const ActionBar = () => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const transitions = useTransition(showSearch, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 50 },
    exitBeforeEnter: true,
  });

  return (
    <div className="flex h-8 items-center justify-end gap-1">
      {transitions((style, showSearch) => (
        <animated.div style={style} className="inline-flex items-center">
          {showSearch ? (
            <Input
              type="search"
              aria-label="Search for clubs"
              onBlur={() => {
                if (!search) {
                  setShowSearch(false);
                }
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              density="compact"
              className="w-64"
              autoFocus
            />
          ) : (
            <IconButton
              aria-label="Search for clubs, open prompt"
              onPress={() => setShowSearch(true)}
              variant="ghost"
            >
              <Search />
            </IconButton>
          )}
        </animated.div>
      ))}
      <SelectFilterDropdown>
        <IconButton aria-label="Filter your clubs" variant="ghost">
          <Filter />
        </IconButton>
      </SelectFilterDropdown>
    </div>
  );
};
