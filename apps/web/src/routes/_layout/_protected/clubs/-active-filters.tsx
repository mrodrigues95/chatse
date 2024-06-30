import { useContext, useId, type ReactNode } from 'react';
import {
  ChevronRight,
  Glasses,
  Globe,
  GlobeLock,
  Handshake,
  Laptop,
  MapPin,
  Plus,
} from 'lucide-react';

import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SelectItem,
  SubmenuTrigger,
  type MenuProps,
} from '@chatse/toolkit';
import { Icon } from '../../../../components';
import { ActiveFilter, type TOperators } from './-active-filter';
import { useClubsFilters } from './index.lazy';

interface DisplayFields {
  textValue: string;
  icon: ReactNode;
}

interface Filter extends DisplayFields {
  id: string;
  operators: Array<TOperators>;
  defaultOperator: TOperators;
  options: Array<FilterOption>;
}

interface FilterOption extends DisplayFields {
  id: string;
}

type TFilterOrOption = Filter | FilterOption;

const filterOptions = [
  {
    id: 'locations',
    textValue: 'Locations',
    operators: ['is', 'is-not', 'is-any-of'],
    defaultOperator: 'is',
    icon: <MapPin />,
    options: [
      { id: 'online', textValue: 'Online', icon: <Laptop /> },
      { id: 'meetup', textValue: 'Meetup', icon: <Handshake /> },
    ],
  },
  {
    id: 'visibility',
    textValue: 'Visibility',
    operators: ['is', 'is-not', 'is-any-of'],
    defaultOperator: 'is',
    icon: <Glasses />,
    options: [
      { id: 'public', textValue: 'Public', icon: <Globe /> },
      { id: 'private', textValue: 'Private', icon: <GlobeLock /> },
    ],
  },
] as const satisfies Array<TFilterOrOption>;

type TFilterWithOptions = (typeof filterOptions)[number];
export type TFilterId = TFilterWithOptions['id'];
export type TFilterOptionId = TFilterWithOptions['options'][number]['id'];

const SubmenuIcon = (
  <Icon size="xs">
    <ChevronRight />
  </Icon>
);

const SelectFilterDropdownMenuItem = ({ item }: { item: TFilterOrOption }) => (
  <MenuItem id={item.id} textValue={item.textValue} submenuIcon={SubmenuIcon}>
    <Icon className="text-slate-500">{item.icon}</Icon>
    {item.textValue}
  </MenuItem>
);

const SelectFilterDropdownSubmenu = ({ item }: { item: TFilterOrOption }) => {
  const { onAddFilter } = useClubsFilters();

  return 'options' in item ? (
    // @ts-ignore: React19 not fully supported yet by RAC.
    <SubmenuTrigger>
      <SelectFilterDropdownMenuItem item={item} />
      <Popover>
        <Menu
          items={item.options}
          onAction={id => onAddFilter(item.id as TFilterId, id as TFilterOptionId)}
        >
          {item => <SelectFilterDropdownSubmenu item={item} />}
        </Menu>
      </Popover>
    </SubmenuTrigger>
  ) : (
    <SelectFilterDropdownMenuItem item={item} />
  );
};

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
      <Menu {...menuProps} items={filterOptions}>
        {item => <SelectFilterDropdownSubmenu item={item} />}
      </Menu>
    </MenuTrigger>
  );
};

const getFilterOption = <TFilterId extends TFilterWithOptions['id']>(id: TFilterId) =>
  filterOptions.find((v): v is TFilterWithOptions & { id: TFilterId } => v.id === id)!;

export const ActiveFilters = () => {
  const id = useId();
  const { currentFilters, onRemoveFilter, onClearFilters } = useClubsFilters();

  if (!currentFilters.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <ul id={id} className="flex items-center gap-1.5" aria-label="Current filters">
        {currentFilters.map(({ id, initialOption }) => {
          const descriptor = getFilterOption(id);

          return (
            <li key={id}>
              <ActiveFilter
                aria-label="Locations filter"
                label={descriptor.textValue}
                icon={<Icon className="text-slate-500">{descriptor.icon}</Icon>}
              >
                <ActiveFilter.Operators
                  operators={descriptor.operators}
                  defaultSelectedKey={descriptor.defaultOperator}
                />
                <ActiveFilter.Options defaultSelectedKey={initialOption}>
                  {descriptor.options.map(opt => (
                    <SelectItem key={opt.id} id={opt.id} textValue={opt.textValue}>
                      <Icon>{opt.icon}</Icon>
                      {opt.textValue}
                    </SelectItem>
                  ))}
                </ActiveFilter.Options>
                <ActiveFilter.Remove onPress={() => onRemoveFilter(id)} />
              </ActiveFilter>
            </li>
          );
        })}
        <li>
          <SelectFilterDropdown>
            <Button variant="ghost">
              <Icon>
                <Plus />
              </Icon>
              Add filter
            </Button>
          </SelectFilterDropdown>
        </li>
      </ul>
      <div className="inline-flex gap-1.5">
        <Button variant="ghost" size="sm" aria-describedby={id} onPress={onClearFilters}>
          Clear
        </Button>
        <Button variant="outline" size="sm" aria-describedby={id}>
          Apply
        </Button>
      </div>
    </div>
  );
};
