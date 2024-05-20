import { forwardRef, type ComponentProps, type ReactNode } from 'react';
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

BaseLink.displayName = 'BaseLink';

export const Link = createLink(BaseLink);

export type LinkProps = ComponentProps<typeof Link>;
