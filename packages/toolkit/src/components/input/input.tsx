import {
  Input as AriaInput,
  composeRenderProps,
  type InputProps as AriaInputProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

export const inputVariants = tv({
  base: [
    'block rounded-md border border-slate-300 bg-white text-sm shadow-sm outline-none ring-offset-4 transition duration-150',
    'placeholder:text-slate-400',
    'disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none',
  ],
  variants: {
    density: {
      loose: 'px-3 py-2',
      compact: 'px-2 py-1.5',
    },
    isInvalid: {
      false: 'focus:border-blue-400 focus:ring-4 focus:ring-blue-200',
      true: 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-200',
    },
  },
  defaultVariants: {
    density: 'compact',
  },
});

export interface InputProps extends AriaInputProps, VariantProps<typeof inputVariants> {}

export const Input = ({ density = 'compact', ...props }: InputProps) => (
  <AriaInput
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      inputVariants({ ...renderProps, density, className }),
    )}
  />
);
