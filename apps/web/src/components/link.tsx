'use client';

import { forwardRef, ReactNode } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { VariantProps } from 'class-variance-authority';

import { buttonVariants, cn } from '@chatse/toolkit';

interface LinkProps extends NextLinkProps, VariantProps<typeof buttonVariants> {
  className?: string;
  children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'link', size, className, ...props }, ref) => (
    <NextLink {...props} className={cn(buttonVariants({ variant, size, className }))} ref={ref} />
  ),
);

Link.displayName = 'Link';
