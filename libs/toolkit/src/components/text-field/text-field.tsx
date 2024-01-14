'use client';

import { forwardRef } from 'react';
import {
  FieldError as AriaFieldError,
  Text as AriaText,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';

import { cn } from '../../utils/cn';
import { Input, type InputProps } from '../input/input';
import { Label, type LabelProps } from '../label/label';

export interface TextFieldProps extends AriaTextFieldProps {
  label: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  labelProps?: LabelProps;
  inputProps?: InputProps;
}

// TODO: Make generic <Field /> component, use :has() selectors to style data-[invalid] error states.
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      description,
      errorMessage,
      placeholder,
      isRequired,
      labelProps,
      inputProps,
      className,
      ...props
    },
    ref,
  ) => (
    <AriaTextField
      isRequired={isRequired}
      className={cn('group flex w-full max-w-sm flex-col gap-2', className)}
      {...props}
      ref={ref}
    >
      <Label {...labelProps}>
        {label} {isRequired && <i aria-hidden>*</i>}
      </Label>
      <Input placeholder={placeholder} {...inputProps} />
      {description && (
        <AriaText className="text-sm leading-none" slot="description">
          {description}
        </AriaText>
      )}
      <AriaFieldError className="text-sm leading-none group-data-[invalid]:text-red-500">
        {errorMessage}
      </AriaFieldError>
    </AriaTextField>
  ),
);
