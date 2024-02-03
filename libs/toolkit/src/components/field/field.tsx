import {
  FieldError as AriaFieldError,
  Label as AriaLabel,
  Text as AriaText,
  type FieldErrorProps as AriaFieldErrorProps,
  type LabelProps as AriaLabelProps,
  type TextProps as AriaTextProps,
} from 'react-aria-components';

import { cn, composeTwRenderProps } from '../../utils/cn';

export interface LabelProps extends AriaLabelProps {}

export const Label = (props: LabelProps) => (
  <AriaLabel
    {...props}
    className={cn(
      'block text-sm font-semibold leading-tight group-data-[invalid]:text-red-500',
      props.className,
    )}
  />
);

export interface DescriptionProps extends AriaTextProps {}

export const Description = (props: AriaTextProps) => (
  <AriaText {...props} slot="description" className={cn('text-sm leading-none', props.className)} />
);

export interface FieldErrorProps extends AriaFieldErrorProps {}

export const FieldError = (props: AriaFieldErrorProps) => (
  <AriaFieldError
    {...props}
    className={composeTwRenderProps(
      props.className,
      'text-sm leading-none text-red-600 group-data-[invalid]:text-red-500',
    )}
  />
);
