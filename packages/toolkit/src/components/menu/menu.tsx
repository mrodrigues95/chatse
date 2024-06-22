import { type ReactNode } from 'react';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  composeRenderProps,
  MenuTrigger,
  Separator,
  SubmenuTrigger,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  type Selection,
  type SeparatorProps,
} from 'react-aria-components';

import { cn } from '../../utils/cn';
import {
  dropdownItemStyles,
  DropdownSection,
  type DropdownSectionProps,
} from '../list-box/list-box';
import { Popover, type PopoverProps } from '../popover/popover';

export { MenuTrigger, SubmenuTrigger, type Selection };

export interface MenuProps<T> extends AriaMenuProps<T> {
  placement?: PopoverProps['placement'];
}

export const Menu = <T extends object>(props: MenuProps<T>) => {
  return (
    <Popover placement={props.placement} className="min-w-[150px]">
      <AriaMenu
        {...props}
        className={cn(
          'max-h-[inherit] overflow-auto p-1 shadow-sm outline-none [clip-path:inset(0_0_0_0_round_.75rem)]',
          props.className,
        )}
      />
    </Popover>
  );
};

export interface MenuItemProps<T> extends AriaMenuItemProps<T> {
  selectedIcon?: ReactNode;
  submenuIcon?: ReactNode;
}

export const MenuItem = <T extends object>(props: MenuItemProps<T>) => {
  const textValue =
    props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaMenuItem
      {...props}
      textValue={textValue}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(props.children, (children, { selectionMode, isSelected, hasSubmenu }) => (
        <>
          {selectionMode !== 'none' && props.selectedIcon && (
            <span className="flex w-4 items-center">{isSelected && props.selectedIcon}</span>
          )}
          <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
          {hasSubmenu && props.submenuIcon}
        </>
      ))}
    </AriaMenuItem>
  );
};

export const MenuSeparator = (props: SeparatorProps) => {
  return <Separator {...props} className={cn('my-1 h-px bg-slate-100', props.className)} />;
};

export const MenuSection = <T extends object>(props: DropdownSectionProps<T>) => {
  return <DropdownSection {...props} />;
};
