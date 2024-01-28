'use client';

import { useId, type ReactNode } from 'react';

import { Text } from '@chatse/toolkit';

interface NavGroupProps {
  title: string;
  children: ReactNode;
}

export const NavGroup = ({ title, children }: NavGroupProps) => {
  const id = useId();

  return (
    <li>
      <Text id={id} className="mb-2 px-2 text-xs font-semibold uppercase text-slate-700" asChild>
        <h3>{title}</h3>
      </Text>
      <ul aria-labelledby={id}>{children}</ul>
    </li>
  );
};
