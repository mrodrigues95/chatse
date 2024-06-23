import { useId } from 'react';
import { MapPin, Plus } from 'lucide-react';

import { Button, SelectItem } from '@chatse/toolkit';
import { Icon } from '../../../../components';
import { ActiveFilter } from './-active-filter';
import { getFilterDescriptor, SelectFilterDropdown } from './-select-filter-dropdown';

export const ActiveFilters = () => {
  const id = useId();
  const locations = getFilterDescriptor('locations');

  return (
    <div className="flex items-center justify-between">
      <ul id={id} className="flex items-center gap-1.5" aria-label="Current filters">
        <li>
          <ActiveFilter
            aria-label="Locations filter"
            label={locations.textValue}
            icon={<Icon className="text-slate-500">{locations.icon}</Icon>}
          >
            <ActiveFilter.Operators operators={['is', 'is-not']} defaultSelectedKey="is" />
            <ActiveFilter.Options defaultSelectedKey={locations.options[0].id}>
              {locations.options.map(opt => (
                <SelectItem key={opt.id} id={opt.id} textValue={opt.textValue}>
                  <Icon>{opt.icon}</Icon>
                  {opt.textValue}
                </SelectItem>
              ))}
            </ActiveFilter.Options>
            <ActiveFilter.Remove />
          </ActiveFilter>
        </li>
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
        <Button variant="ghost" size="sm" aria-describedby={id}>
          Clear
        </Button>
        <Button variant="outline" size="sm" aria-describedby={id}>
          Apply
        </Button>
      </div>
    </div>
  );
};
