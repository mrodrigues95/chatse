import { type ReactNode } from 'react';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  composeRenderProps,
  Separator,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  type SeparatorProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

import { Popover, type PopoverProps } from '../popover/popover';

export interface MenuProps<T> extends AriaMenuProps<T> {
  placement?: PopoverProps['placement'];
}

export const Menu = <T extends object>(props: MenuProps<T>) => {
  return (
    <Popover placement={props.placement} className="min-w-[150px]">
      <AriaMenu
        {...props}
        className="max-h-[inherit] overflow-auto p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"
      />
    </Popover>
  );
};

const menuItemVariants = tv({
  base: 'group flex cursor-default select-none items-center gap-4 rounded-lg py-2 pl-3 pr-1 text-sm outline outline-0',
  variants: {
    isDisabled: {
      false: 'text-slate-900',
      true: 'text-slate-300',
    },
    isFocused: {
      true: 'bg-blue-600 text-white',
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

export interface MenuItemProps<T> extends AriaMenuItemProps<T> {
  selectedIcon?: ReactNode;
}

export const MenuItem = <T extends object>(props: MenuItemProps<T>) => {
  return (
    <AriaMenuItem
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        menuItemVariants({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(props.children, (children, { selectionMode, isSelected }) => (
        <>
          {selectionMode !== 'none' && (
            <span className="forced-colors: flex w-4 items-center">
              {isSelected && props.selectedIcon}
            </span>
          )}
          <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
        </>
      ))}
    </AriaMenuItem>
  );
};

export const MenuSeparator = (props: SeparatorProps) => {
  return <Separator {...props} className="mx-3 my-1 border-b border-gray-300" />;
};
