'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Input as AriaInput, type InputProps as AriaInputProps } from 'react-aria-components';

import { cn } from '../../utils/cn';

export const inputVariants = cva(
  [
    'block rounded-md border border-slate-300 bg-white text-sm shadow-sm outline-none ring-offset-4 transition duration-150',
    'focus:border-blue-400 focus:ring-4 focus:ring-blue-200',
    'aria-[invalid]:border-red-400 aria-[invalid]:focus:ring-red-200',
    'placeholder:text-slate-400',
    'disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none',
  ],
  {
    variants: {
      density: {
        loose: 'px-3 py-2',
        compact: 'px-2 py-1.5',
      },
    },
    defaultVariants: {
      density: 'compact',
    },
  },
);

export interface InputProps extends AriaInputProps, VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, density = 'compact', ...props }, ref) => (
    <AriaInput {...props} className={cn(inputVariants({ density, className }))} ref={ref} />
  ),
);
