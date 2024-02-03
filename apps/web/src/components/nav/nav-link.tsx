'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { tv } from 'tailwind-variants';

import { Link, type LinkProps } from '../link/link';

const navLinkVariants = tv({
  base: ['relative w-full justify-start rounded-none py-2 pl-[1.375rem]', 'focus-visible:ring-0'],
  variants: {
    variant: {
      default: [
        'bg-transparent',
        'hover:bg-slate-100 hover:text-blue-700',
        'focus-visible:bg-slate-100',
        'focus-visible:text-blue-700',
      ],
      selected: [
        'bg-slate-100 text-blue-700',
        'hover:bg-slate-200 hover:text-blue-700',
        'focus-visible:bg-slate-200',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface NavLinkProps extends LinkProps {}

export const NavLink = ({ href, children, className, ...props }: NavLinkProps) => {
  const segment = useSelectedLayoutSegment();
  const selected = segment === (href as string).slice(1);

  return (
    <li className="-mx-3.5">
      <Link
        href={href}
        variant="ghost"
        size="sm"
        className={navLinkVariants({ variant: selected ? 'selected' : 'default', className })}
        {...props}
      >
        {selected && (
          <span
            className="width-4 absolute inset-y-0 left-[-1.5px] my-auto h-1/2 w-1 rounded-r-full bg-blue-700"
            role="presentation"
          />
        )}
        {children}
      </Link>
    </li>
  );
};
