'use client';

import { ComponentProps } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../utils/cn';
import { useAlert } from './alert';

export const alertContentVariants = cva('', {
  variants: {
    variant: {
      info: 'text-sky-700',
      warning: 'text-amber-700',
      success: 'text-emerald-700',
      error: 'text-red-700',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

interface AlertContentProps extends ComponentProps<'section'> {}

export const AlertContent = ({ className, children, ...props }: AlertContentProps) => {
  const ctx = useAlert();

  if (!ctx) {
    throw new Error('<Alert.Content /> can only be used as a child of <Alert />.');
  }

  const { variant } = ctx;

  return (
    <section className={cn(alertContentVariants({ variant, className }))} {...props}>
      {children}
    </section>
  );
};
