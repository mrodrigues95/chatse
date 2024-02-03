import { clsx, type ClassValue } from 'clsx';
import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const composeTwRenderProps = <T>(
  className: string | ((v: T) => string) | undefined,
  ...tw: ClassValue[]
): string | ((v: T) => string) => composeRenderProps(className, className => cn(tw, className));
