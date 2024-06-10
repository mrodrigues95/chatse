import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
  base: [
    'inline-flex select-none items-center justify-center gap-1.5 rounded-md text-sm font-semibold outline-none ring-offset-white transition duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring',
  ],
  variants: {
    variant: {
      default: ['bg-slate-100 text-slate-700', 'hover:bg-slate-200 hover:text-slate-900'],
      solid: ['bg-slate-900 text-white', 'hover:bg-slate-700'],
      solidBlue: ['bg-blue-700 text-white', 'hover:bg-blue-900'],
      danger: [
        'text-red-600 hover:bg-red-100',
        'focus-visible:bg-red-100 focus-visible:ring-red-600',
      ],
      outline: [
        'border-2 border-slate-200 bg-transparent text-slate-700 shadow-sm',
        'hover:bg-slate-100 hover:text-slate-900',
      ],
      ghost: ['bg-transparent text-slate-500', 'hover:bg-slate-100 hover:text-slate-900'],
      link: [
        'text-slate-900 underline-offset-4',
        'hover:underline',
        'focus-visible:underline focus-visible:ring-0',
      ],
    },
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-2 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});

export interface ButtonProps extends AriaButtonProps, VariantProps<typeof buttonVariants> {}

export const Button = ({ variant, size, ...props }: ButtonProps) => (
  <AriaButton
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      buttonVariants({ ...renderProps, variant, size, className }),
    )}
  />
);
