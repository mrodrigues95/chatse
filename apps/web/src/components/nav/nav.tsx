'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { LucideHome, LucideUsersRound } from 'lucide-react';

import { cn, Text } from '@chatse/toolkit';
import { Icon } from '../icon/icon';
import { Link } from '../link/link';

export const Nav = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <aside className="w-[16rem] border-r-2 border-slate-200">
      <nav className="px-6 py-4">
        <ul>
          <li>
            <Text className="mb-2 text-xs font-semibold uppercase text-slate-900" asChild>
              <h5>General</h5>
            </Text>
            <ul className="ml-2 space-y-2 border-l border-slate-100">
              <li>
                <Link
                  href="/clubs"
                  variant="default"
                  size="sm"
                  className={cn(
                    '-ml-px w-full justify-start rounded-none border-l border-transparent bg-transparent',
                    'hover:bg-transparent hover:text-blue-900',
                    segment === 'clubs' && 'border-l-blue-500 text-blue-700',
                  )}
                >
                  <Icon>
                    <LucideHome />
                  </Icon>
                  Clubs
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  variant="default"
                  size="sm"
                  className={cn(
                    '-ml-px w-full justify-start rounded-none border-l border-transparent bg-transparent text-slate-500',
                    'hover:bg-transparent hover:text-blue-900',
                    segment === 'community' && 'border-l-blue-900 text-blue-700',
                  )}
                >
                  <Icon>
                    <LucideUsersRound />
                  </Icon>
                  Community
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
