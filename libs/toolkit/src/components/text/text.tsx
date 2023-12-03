import { forwardRef, HTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/cn';

const textVariants = cva('text-slate-900', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold tracking-tight',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
      h5: 'text-lg font-semibold tracking-tight',
      h6: 'text-base font-semibold tracking-tight',
      p: 'text-slate-700',
      muted: 'text-slate-500',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type VariantPropType = VariantProps<typeof textVariants>;

const variantElementMap: Record<NonNullable<VariantPropType['variant']>, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  muted: 'p',
};

export interface TextProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  asChild?: boolean;
  as?: string;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Component = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : undefined) ?? 'span';

    return <Component className={cn(textVariants({ variant, className }))} ref={ref} {...props} />;
  },
);
