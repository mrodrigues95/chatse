import { tv, type VariantProps } from 'tailwind-variants';

import { AccessibleIcon, type AccessibleIconProps } from '@chatse/toolkit';

const iconVariants = tv({
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
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
