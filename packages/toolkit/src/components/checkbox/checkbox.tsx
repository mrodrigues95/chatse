import { type ReactNode } from 'react';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  composeRenderProps,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type CheckboxProps as AriaCheckboxProps,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

import { composeTwRenderProps } from '../../utils/cn';
import { Description, FieldError, Label } from '../field/field';

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export const CheckboxGroup = (props: CheckboxGroupProps) => (
  <AriaCheckboxGroup
    {...props}
    className={composeTwRenderProps(props.className, 'flex flex-col gap-2')}
  >
    <Label>{props.label}</Label>
    {props.children}
    {props.description && <Description>{props.description}</Description>}
    <FieldError>{props.errorMessage}</FieldError>
  </AriaCheckboxGroup>
);

const checkboxStyles = tv({
  base: 'group flex items-center gap-2 text-sm transition',
  variants: {
    isDisabled: {
      false: 'text-slate-800',
      true: 'text-slate-300',
    },
  },
});

const boxStyles = tv({
  base: ['flex size-5 flex-shrink-0 items-center justify-center rounded border-2 transition'],
  variants: {
    isFocusVisible: {
      true: 'outline-none ring ring-offset-2 ring-offset-white',
    },
    isSelected: {
      false:
        'group-pressed:[--color:theme(colors.slate.500)] border-[--color] bg-white [--color:theme(colors.slate.400)]',
      true: 'group-pressed:[--color:theme(colors.slate.800)] border-[--color] bg-[--color] [--color:theme(colors.slate.700)]',
    },
    isInvalid: {
      true: 'group-pressed:[--color:theme(colors.red.800)] [--color:theme(colors.red.700)]',
    },
    isDisabled: {
      true: '[--color:theme(colors.slate.200)]',
    },
  },
});

export interface CheckboxProps extends AriaCheckboxProps {
  indeterminateIcon: ReactNode;
  checkIcon: ReactNode;
}

export const Checkbox = ({ indeterminateIcon, checkIcon, ...props }: CheckboxProps) => (
  <AriaCheckbox
    {...props}
    className={composeRenderProps(props.className, (className, renderProps) =>
      checkboxStyles({ ...renderProps, className }),
    )}
  >
    {({ isSelected, isIndeterminate, ...renderProps }) => (
      <>
        <div className={boxStyles({ isSelected: isSelected || isIndeterminate, ...renderProps })}>
          {isIndeterminate ? indeterminateIcon : isSelected ? checkIcon : null}
        </div>
        {props.children}
      </>
    )}
  </AriaCheckbox>
);
