import { composeRenderProps } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { AccessibleIcon } from '../accessible-icon/accessible-icon';
import { Button, type ButtonProps } from '../button/button';

export const iconButtonVariants = tv({
  base: 'p-1',
  variants: {
    size: {
      xs: 'size-4',
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-10',
    },
    radius: {
      none: 'rounded-none',
      md: 'rounded-md',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'sm',
    radius: 'md',
  },
});

export interface IconButtonProps
  extends Omit<ButtonProps, 'size'>,
    VariantProps<typeof iconButtonVariants> {
  'aria-label': string;
}

export const IconButton = ({ size, radius, children, ...props }: IconButtonProps) => (
  <Button
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      iconButtonVariants({ ...renderProps, size, radius, className }),
    )}
  >
    {props => (
      <AccessibleIcon>{typeof children === 'function' ? children(props) : children}</AccessibleIcon>
    )}
  </Button>
);
