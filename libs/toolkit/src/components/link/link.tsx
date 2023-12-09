'use client';

import { forwardRef } from 'react';
import { VariantProps } from 'class-variance-authority';
import { Link as AriaLink, LinkProps as AriaLinkProps } from 'react-aria-components';

import { cn } from '../../utils/cn';
import { buttonVariants } from '../button/button';

export interface LinkProps extends AriaLinkProps, VariantProps<typeof buttonVariants> {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'link', size, className, ...props }, ref) => (
    <AriaLink className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  ),
);
