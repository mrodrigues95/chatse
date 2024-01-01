'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/cn';
import { Button, type ButtonProps } from '../button/button';

export const iconButtonVariants = cva('p-1', {
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    },
    radius: {
      none: 'rounded-none',
      md: 'rounded-md',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'md',
  },
});

export interface IconButtonProps
  extends Omit<ButtonProps, 'size'>,
    VariantProps<typeof iconButtonVariants> {
  'aria-label': string;
}

export const IconButton = ({ size, className, ...props }: IconButtonProps) => (
  <Button size={size} className={cn(iconButtonVariants({ size, className }))} {...props} />
);
