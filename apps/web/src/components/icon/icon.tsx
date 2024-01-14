import { cva, type VariantProps } from 'class-variance-authority';

import { AccessibleIcon, cn, type AccessibleIconProps } from '@chatse/toolkit';

const iconVariants = cva('', {
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
  <AccessibleIcon className={cn(iconVariants({ size, className }))} {...props} />
);
