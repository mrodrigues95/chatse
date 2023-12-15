'use client';

import { Form as AriaForm, FormProps as AriaFormProps } from 'react-aria-components';

import { cn } from '../../utils/cn';
import { Input } from '../input/input';

export interface FormProps extends AriaFormProps {}

export const Form = ({ className, onSubmit, ...props }: FormProps) => (
  <AriaForm
    className={cn('space-y-4', className)}
    onSubmit={e => {
      if (onSubmit) {
        e.preventDefault();
        return onSubmit?.(e);
      }
    }}
    {...props}
  />
);

Form.Input = Input;
