'use client';

import { type ReactNode } from 'react';

// import { useSelectedLayoutSegment } from 'next/navigation';

import { cn, Text } from '@chatse/toolkit';
import { Icon } from '../../components/icon';
import { Link } from '../../components/link';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  // const segment = useSelectedLayoutSegment();

  return (
    <>
      <div className="relative flex min-h-screen flex-1 flex-col">
        <header className="border-b-2 border-slate-200 px-6 py-2">
          <Icon name="Egg" className="mr-1.5 inline-block" />
          <Text variant="p" as="span">
            Chatse
          </Text>
        </header>
        <main className="flex flex-1">
          <aside className="w-[16rem] border-r-2 border-slate-200">
            <nav className="px-6 py-4">
              <ul>
                <li>
                  <Text as="h5" className="mb-2 text-sm font-semibold uppercase text-slate-900">
                    General
                  </Text>
                  <ul className="space-y-2 border-l border-slate-100">
                    <li>
                      <Link
                        href="/home"
                        variant="default"
                        size="sm"
                        className={cn(
                          '-ml-px w-full justify-start rounded-none border-l border-transparent bg-transparent',
                          'hover:bg-transparent hover:text-blue-900',
                          true && 'border-l-blue-500 text-blue-700',
                        )}
                      >
                        <Icon name="Home" />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/clubs"
                        variant="default"
                        size="sm"
                        className={cn(
                          '-ml-px w-full justify-start rounded-none border-l border-transparent bg-transparent text-slate-500',
                          'hover:bg-transparent hover:text-blue-900',
                          // true && 'text-blue-700 border-l-blue-900',
                        )}
                      >
                        <Icon name="UsersRound" />
                        Clubs
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="flex-1 bg-slate-50 px-6 py-4">
            <Text variant="h1">Home</Text>
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
