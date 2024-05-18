import {
  Link as AriaLink,
  composeRenderProps,
  type LinkProps as AriaLinkProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { buttonVariants } from '../button/button';

export const linkVariants = tv({
  extend: buttonVariants,
  defaultVariants: { variant: 'link' },
});

export interface LinkProps extends AriaLinkProps, VariantProps<typeof linkVariants> {}

export const Link = ({ variant, size, ...props }: LinkProps) => (
  <AriaLink
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      linkVariants({ ...renderProps, variant, size, className }),
    )}
  />
);
