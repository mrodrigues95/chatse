import { type ReactNode } from 'react';
import {
  Select as AriaSelect,
  Button,
  composeRenderProps,
  ListBox,
  SelectValue,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
  type SelectValueProps,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

import { composeTwRenderProps, focusRing } from '../../utils/cn';
import { type ButtonProps } from '../button/button';
import {
  Description,
  FieldError,
  Label,
  type DescriptionProps,
  type FieldErrorProps,
  type LabelProps,
} from '../field/field';
import { DropdownItem, DropdownSection, type DropdownSectionProps } from '../list-box/list-box';
import { Popover } from '../popover/popover';

const selectButtonVariants = tv({
  extend: focusRing,
  base: 'flex w-full min-w-[150px] cursor-default items-center gap-4 rounded-lg border border-black/10 bg-slate-50/75 px-2 py-1 text-sm/6 shadow-sm transition duration-150',
  variants: {
    isDisabled: {
      false: 'text-slate-900 hover:bg-slate-100 group-invalid:border-red-600',
      true: 'text-slate-200',
    },
  },
});

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  labelProps?: LabelProps;
  descriptionProps?: DescriptionProps;
  fieldErrorProps?: FieldErrorProps;
  buttonProps?: ButtonProps;
  selectValueProps?: SelectValueProps<T>;
  items?: Iterable<T>;
  icon?: ReactNode;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export const Select = <T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  isRequired,
  labelProps,
  descriptionProps,
  fieldErrorProps,
  buttonProps,
  selectValueProps,
  icon,
  items,
  children,
  ...props
}: SelectProps<T>) => {
  return (
    <AriaSelect
      isRequired={isRequired}
      {...props}
      className={composeTwRenderProps(props.className, 'group flex flex-col gap-1')}
    >
      {label && (
        <Label {...labelProps}>
          {label} {isRequired && <i aria-hidden="true">*</i>}
        </Label>
      )}
      <Button
        {...buttonProps}
        className={composeRenderProps(buttonProps?.className, (className, renderProps) =>
          selectButtonVariants({ ...renderProps, className }),
        )}
      >
        <SelectValue
          className={composeTwRenderProps(
            selectValueProps?.className,
            'inline-flex flex-1 truncate placeholder-shown:italic placeholder-shown:text-slate-600',
          )}
        />
        {icon}
      </Button>
      {description && <Description {...descriptionProps}>{description}</Description>}
      <FieldError {...fieldErrorProps}>{errorMessage}</FieldError>
      <Popover className="min-w-[--trigger-width]">
        <ListBox items={items} className="max-h-[inherit] overflow-auto p-1 outline-none">
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
};

export const SelectItem = (props: ListBoxItemProps) => {
  return <DropdownItem {...props} />;
};

export const SelectSection = <T extends object>(props: DropdownSectionProps<T>) => {
  return <DropdownSection {...props} />;
};
