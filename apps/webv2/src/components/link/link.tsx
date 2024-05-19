import { ComponentProps, forwardRef, type ReactNode } from 'react';
import { createLink, Link as TanstackLink } from '@tanstack/react-router';
import { type VariantProps } from 'tailwind-variants';

import { linkVariants } from '@chatse/toolkit';

interface BaseLinkProps extends VariantProps<typeof linkVariants> {
  className?: string;
  children?: ReactNode;
}

const BaseLink = forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ variant = 'link', size, className, ...props }, ref) => (
    <TanstackLink {...props} className={linkVariants({ variant, size, className })} ref={ref} />
  ),
);

export const Link = createLink(BaseLink);

export type LinkProps = ComponentProps<typeof Link>;
