import { type ReactNode } from 'react';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Collection,
  composeRenderProps,
  Header,
  Section,
  type ListBoxItemProps as AriaListBoxItemProps,
  type ListBoxProps as AriaListBoxProps,
  type SectionProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

import { composeTwRenderProps } from '../../utils/cn';

export interface ListBoxProps<T> extends Omit<AriaListBoxProps<T>, 'layout' | 'orientation'> {}

export const ListBox = <T extends object>({ children, ...props }: ListBoxProps<T>) => {
  return (
    <AriaListBox
      {...props}
      className={composeTwRenderProps(
        props.className,
        'min-w-40 rounded-lg border border-slate-300 p-1 outline-0',
      )}
    >
      {children}
    </AriaListBox>
  );
};

export const listBoxItemStyles = tv({
  base: [
    'group relative flex cursor-default select-none items-center gap-2 rounded-md px-3 py-0.5 text-sm/6 text-slate-900 outline-none',
    'hover:bg-slate-100',
    'focus-visible:outline-none focus-visible:ring',
  ],
  variants: {
    isDisabled: {
      true: 'text-slate-300',
    },
  },
});

export interface ListBoxItemProps extends AriaListBoxItemProps {
  selectedIcon?: ReactNode;
}

export const ListBoxItem = ({ ...props }: ListBoxItemProps) => {
  const textValue =
    props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem
      {...props}
      textValue={textValue}
      className={composeRenderProps(props.className, (className, renderProps) =>
        listBoxItemStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
          {isSelected && props.selectedIcon}
        </>
      ))}
    </AriaListBoxItem>
  );
};

export const dropdownItemStyles = tv({
  base: 'group flex cursor-default select-none items-center gap-2 rounded-md px-3 py-0.5 text-sm/6 outline-none',
  variants: {
    isDisabled: {
      false: 'text-slate-900',
      true: 'text-slate-300',
    },
    isFocused: {
      true: 'bg-slate-100 text-slate-950',
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: 'bg-slate-100',
    },
  ],
});

export const DropdownItem = (props: ListBoxItemProps) => {
  const textValue =
    props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem
      {...props}
      textValue={textValue}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
          {isSelected && props.selectedIcon}
        </>
      ))}
    </AriaListBoxItem>
  );
};

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
}

export const DropdownSection = <T extends object>(props: DropdownSectionProps<T>) => {
  return (
    <Section>
      <Header className="truncate pb-1 pl-1 text-xs/6 font-bold text-slate-900">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </Section>
  );
};
