'use client';

import { forwardRef, type ReactNode } from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { type VariantProps } from 'tailwind-variants';

import { linkVariants } from '@chatse/toolkit';

export interface LinkProps extends NextLinkProps, VariantProps<typeof linkVariants> {
  className?: string;
  children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'link', size, className, ...props }, ref) => (
    <NextLink {...props} className={linkVariants({ variant, size, className })} ref={ref} />
  ),
);

Link.displayName = 'Link';
