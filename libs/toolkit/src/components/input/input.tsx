'use client';

import { forwardRef } from 'react';
import {
  FieldError as AriaFieldError,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
  TextField as AriaTextField,
  type InputProps as AriaInputProps,
  type LabelProps as AriaLabelProps,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';

import { cn } from '../../utils/cn';

export interface InputProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  labelProps?: AriaLabelProps;
  inputProps?: AriaInputProps;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
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
      <AriaLabel
        {...labelProps}
        className={cn(
          'block text-sm font-semibold leading-tight group-data-[invalid]:text-red-500',
          labelProps?.className,
        )}
      >
        {label} {isRequired && <i aria-hidden>*</i>}
      </AriaLabel>
      <AriaInput
        {...inputProps}
        placeholder={placeholder}
        className={cn(
          'block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-offset-4 transition duration-150',
          'focus:border-blue-400 focus:ring-4 focus:ring-blue-200',
          'aria-[invalid]:border-red-400 aria-[invalid]:focus:ring-red-200',
          'placeholder:text-slate-400',
          'disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none',
          inputProps?.className,
        )}
      />
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
