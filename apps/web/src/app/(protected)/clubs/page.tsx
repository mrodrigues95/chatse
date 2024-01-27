'use client';

import { useState } from 'react';
import { LucideFilter, LucideSearch } from 'lucide-react';

import { IconButton, Input, Seperator, Text } from '@chatse/toolkit';

// export const revalidate = 0;

const ClubsPage = () => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <section className="flex-1 px-6 py-4">
      <Text variant="title">Clubs</Text>
      <div className="flex h-8 items-center justify-end gap-1.5">
        {showSearch ? (
          <Input
            type="search"
            aria-label="Search for clubs"
            onBlur={() => {
              if (!search) {
                setShowSearch(false);
              }
            }}
            onChange={e => setSearch(e.target.value)}
            density="compact"
            className="w-64"
            autoFocus
          />
        ) : (
          <IconButton aria-label="Begin searching for clubs" onPress={() => setShowSearch(true)}>
            <LucideSearch />
          </IconButton>
        )}
        <IconButton aria-label="Filter your clubs">
          <LucideFilter />
        </IconButton>
      </div>
      <Seperator />
    </section>
  );
};

export default ClubsPage;
