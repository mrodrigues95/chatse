'use client';

import { useState } from 'react';
import { LucideFilter, LucideSearch } from 'lucide-react';

import { IconButton, Input } from '@chatse/toolkit';

export const ActionBar = () => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <section className="flex h-8 items-center justify-end gap-1.5">
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
          aria-label="Begin searching for clubs"
          onPress={() => setShowSearch(true)}
          variant="outline"
        >
          <LucideSearch />
        </IconButton>
      )}
      <IconButton aria-label="Filter your clubs" variant="outline">
        <LucideFilter />
      </IconButton>
    </section>
  );
};
