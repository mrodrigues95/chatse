import { forwardRef, type HTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Text as AriaText, type TextProps as AriaTextProps } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

const textVariants = tv({
  variants: {
    variant: {
      hero: 'text-4xl font-semibold tracking-tight text-slate-900',
      title: 'text-3xl font-semibold tracking-tight text-slate-900',
      subtitle: 'text-lg font-medium tracking-tight text-slate-700',
      body: 'text-base font-normal text-slate-700',
      muted: 'text-base font-normal text-slate-500',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type VariantPropType = VariantProps<typeof textVariants>;

const variantElementMap = {
  hero: 'h1',
  title: 'h1',
  subtitle: 'h2',
  body: 'p',
  muted: 'p',
} satisfies Record<NonNullable<VariantPropType['variant']>, string>;

export interface TextProps extends AriaTextProps, VariantProps<typeof textVariants> {}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant = 'body', elementType, ...props }, ref) => (
    <AriaText
      className={textVariants({ variant, className })}
      ref={ref}
      elementType={elementType ?? variantElementMap[variant] ?? 'span'}
      {...props}
    />
  ),
);

Text.displayName = 'Text';
