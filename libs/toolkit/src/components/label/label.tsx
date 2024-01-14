'use client';

import { forwardRef } from 'react';
import { Label as AriaLabel, type LabelProps as AriaLabelProps } from 'react-aria-components';

import { cn } from '../../utils/cn';

export interface LabelProps extends AriaLabelProps {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <AriaLabel
    {...props}
    className={cn(
      'block text-sm font-semibold leading-tight group-data-[invalid]:text-red-500',
      className,
    )}
    ref={ref}
  />
));
