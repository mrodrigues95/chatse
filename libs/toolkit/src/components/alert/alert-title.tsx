'use client';

import { type ComponentProps } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../utils/cn';
import { useAlert } from './alert';

export const alertTitleVariants = cva('font-semibold', {
  variants: {
    variant: {
      info: 'text-sky-800',
      warning: 'text-amber-800',
      success: 'text-emerald-800',
      error: 'text-red-800',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

interface AlertTitleProps extends ComponentProps<'h3'> {}

export const AlertTitle = ({ className, children, ...props }: AlertTitleProps) => {
  const ctx = useAlert();

  if (!ctx) {
    throw new Error('<Alert.Title /> can only be used as a child of <Alert />.');
  }

  const { variant } = ctx;

  return (
    <h3 className={cn(alertTitleVariants({ variant, className }))} {...props}>
      {children}
    </h3>
  );
};
