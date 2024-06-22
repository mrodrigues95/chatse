import { clsx, type ClassValue } from 'clsx';
import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const composeTwRenderProps = <T>(
  className: string | ((v: T) => string) | undefined,
  ...tw: ClassValue[]
): string | ((v: T) => string) => composeRenderProps(className, className => cn(tw, className));

export const focusRing = tv({
  base: [
    'outline-none ring-offset-2 ring-offset-white transition duration-150',
    'focus-visible:ring',
  ],
});
