import { tv, type VariantProps } from 'tailwind-variants';

import { AccessibleIcon, type AccessibleIconProps } from '@chatse/toolkit';

const iconVariants = tv({
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export interface IconProps extends VariantProps<typeof iconVariants>, AccessibleIconProps {}

export const Icon = ({ size, className, ...props }: IconProps) => (
  <AccessibleIcon className={iconVariants({ size, className })} {...props} />
);
