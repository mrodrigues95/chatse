import { BookMarked, Earth } from 'lucide-react';

import { cn } from '@chatse/toolkit';
import { Icon } from '../icon/icon';
import { Link, type LinkProps } from '../link/link';

interface NavItemProps extends LinkProps {}

const NavItem = (props: NavItemProps) => (
  <li>
    <Link
      variant="ghost"
      size="sm"
      {...props}
      className="relative"
      activeProps={{
        'aria-current': 'page',
        className: cn(
          'text-slate-700',
          'after:absolute after:bottom-[calc(50%-2.125rem)] after:right-1/2 after:h-[2px] after:w-full after:translate-x-[50%] after:translate-y-[-50%] after:bg-blue-700 after:content-[""]',
        ),
      }}
    />
  </li>
);

export const Nav = () => (
  <nav
    aria-label="App navigation"
    className={cn('min-h-12 px-4 shadow-[inset_0px_-1px_theme(colors.slate.200)]')}
  >
    <ul className="flex items-center gap-1">
      {(
        [
          ['/clubs', 'Clubs', BookMarked],
          ['/community', 'Community', Earth],
        ] as const
      ).map(([to, label, LucideIcon]) => (
        <NavItem key={to} to={to}>
          <Icon>
            <LucideIcon />
          </Icon>
          {label}
        </NavItem>
      ))}
    </ul>
  </nav>
);
