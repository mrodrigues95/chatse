import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import { tv } from 'tailwind-variants';

import {
  composeTwRenderProps,
  Group,
  IconButton,
  Select,
  SelectItem,
  Text,
  type GroupProps,
  type IconButtonProps,
  type SelectProps,
} from '@chatse/toolkit';

const filterVariants = tv({
  slots: {
    item: [
      'p-0 last:rounded-r-md [&:not(:last-child)]:border-r [&:not(:last-child)]:border-slate-200',
    ],
    button: [
      'min-w-min select-none border-none bg-transparent px-1.5 py-0 shadow-none ring-offset-0 transition-none',
      'pressed:bg-gray-200 hover:bg-slate-100 hover:text-slate-950',
      'focus-visible:ring',
    ],
  },
  compoundSlots: [
    {
      slots: ['button', 'item'],
      className: 'inline-flex items-center gap-1 rounded-none text-sm/6 font-normal text-slate-700',
    },
  ],
});

interface ActiveFilterRemoveButtonProps extends Omit<IconButtonProps, 'children' | 'aria-label'> {}

const ActiveFilterRemoveButton = (props: ActiveFilterRemoveButtonProps) => {
  const { button, item } = filterVariants();

  return (
    <IconButton aria-label="Remove" className={composeTwRenderProps(button(), item())} {...props}>
      <X size={15} />
    </IconButton>
  );
};

type TSingleOperators = 'is' | 'is-not' | 'include' | 'do-not-include';
type TMultipleOperators =
  | 'is-any-of'
  | 'include-all-of'
  | 'include-any-of'
  | 'exclude-if-any-of'
  | 'exclude-if-all';

export type TOperators = TSingleOperators | TMultipleOperators;

const operatorsMap = {
  is: {
    label: 'is',
  },
  'is-not': {
    label: 'is not',
  },
  include: {
    label: 'include',
  },
  'do-not-include': {
    label: 'do not include',
  },
  'is-any-of': {
    label: 'is any of',
  },
  'include-all-of': {
    label: 'include all of',
  },
  'include-any-of': {
    label: 'include any of',
  },
  'exclude-if-any-of': {
    label: 'exclude if any of',
  },
  'exclude-if-all': {
    label: 'exclude if all',
  },
} as const;

interface ActiveFilterOperatorsProps<T extends object> extends Omit<SelectProps<T>, 'children'> {
  operators: Array<TOperators>;
}

const ActiveFilterOperators = <T extends object>({
  operators,
  ...props
}: ActiveFilterOperatorsProps<T>) => {
  const { button, item } = filterVariants();

  return (
    <Select
      aria-label="Operator"
      className={item()}
      buttonProps={{ className: button() }}
      {...props}
    >
      {operators.map(operator => (
        <SelectItem id={operator} key={operator}>
          {operatorsMap[operator].label}
        </SelectItem>
      ))}
    </Select>
  );
};

interface ActiveFilterOptionsProps<T extends object> extends SelectProps<T> {}

const ActiveFilterOptions = <T extends object>({
  children,
  ...props
}: ActiveFilterOptionsProps<T>) => {
  const { button, item } = filterVariants();

  return (
    <Select
      aria-label="Current filter options"
      className={item()}
      buttonProps={{ className: button() }}
      {...props}
    >
      {children}
    </Select>
  );
};

interface ActiveFilterProps extends GroupProps {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const ActiveFilter = ({ label, icon, children, ...props }: ActiveFilterProps) => {
  const { item } = filterVariants();

  return (
    <Group
      {...props}
      className={composeTwRenderProps(
        props.className,
        'group relative flex items-center rounded-md shadow-[0_0_0_1px_theme(colors.slate.200)]',
      )}
    >
      <Text className={item({ className: 'px-1.5 py-0' })}>
        {icon}
        {label}
      </Text>
      {children}
    </Group>
  );
};

ActiveFilter.Operators = ActiveFilterOperators;
ActiveFilter.Options = ActiveFilterOptions;
ActiveFilter.Remove = ActiveFilterRemoveButton;
