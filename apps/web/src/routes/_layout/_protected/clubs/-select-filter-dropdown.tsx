import { type ReactNode } from 'react';
import { ChevronRight, Glasses, Globe, GlobeLock, Handshake, Laptop, MapPin } from 'lucide-react';

import {
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  type MenuProps,
} from '@chatse/toolkit';
import { Icon } from '../../../../components';

const SubmenuIcon = (
  <Icon size="xs">
    <ChevronRight />
  </Icon>
);

type TFilterOption = {
  id: string;
  textValue: string;
  icon: ReactNode;
  children?: Array<TFilterOption>;
};

export const filters = [
  {
    id: 'locations',
    textValue: 'Locations',
    icon: <MapPin />,
    children: [
      { id: 'online', textValue: 'Online', icon: <Laptop /> },
      { id: 'meetup', textValue: 'Meetup', icon: <Handshake /> },
    ],
  },
  {
    id: 'visibility',
    textValue: 'Visibility',
    icon: <Glasses />,
    children: [
      { id: 'public', textValue: 'Public', icon: <Globe /> },
      { id: 'private', textValue: 'Private', icon: <GlobeLock /> },
    ],
  },
] as const satisfies Array<TFilterOption>;

export const getFilterDescriptor = (filter: (typeof filters)[number]['id']) => {
  const fltr = filters.find(({ id }) => filter === id)!;
  return { ...fltr, options: fltr.children };
};

const SelectFilterDropdownMenuItem = ({ item }: { item: TFilterOption }) => (
  <MenuItem key={item.id} textValue={item.textValue} submenuIcon={SubmenuIcon}>
    <Icon className="text-slate-500">{item.icon}</Icon>
    {item.textValue}
  </MenuItem>
);

const SelectFilterDropdownSubmenu = ({ items }: { items: Array<TFilterOption> }) =>
  items.map(item =>
    item.children?.length ? (
      // @ts-ignore: React19 not fully supported yet by RAC.
      <SubmenuTrigger key={item.id}>
        <SelectFilterDropdownMenuItem item={item} />
        <Popover>
          <Menu>
            <SelectFilterDropdownSubmenu items={item.children} />
          </Menu>
        </Popover>
      </SubmenuTrigger>
    ) : (
      <SelectFilterDropdownMenuItem key={item.id} item={item} />
    ),
  );

interface SelectFilterDropdownProps<T extends object> {
  children: ReactNode;
  menuProps?: MenuProps<T>;
}

export const SelectFilterDropdown = <T extends object>({
  children,
  menuProps,
}: SelectFilterDropdownProps<T>) => {
  return (
    <MenuTrigger>
      {children}
      <Menu {...menuProps}>
        <SelectFilterDropdownSubmenu items={filters} />
      </Menu>
    </MenuTrigger>
  );
};
