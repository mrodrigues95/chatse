import { useId } from 'react';
import { MapPin, X } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { composeTwRenderProps, Group, IconButton, Select, SelectItem, Text } from '@chatse/toolkit';
import { Icon } from '../../../../components';

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

export const ActiveFilters = () => {
  const { button, item } = filterVariants();
  const id = useId();

  return (
    <ul className="flex items-center gap-2" aria-label="Current filters">
      <li>
        <Group
          id={id}
          aria-label="Locations filter"
          className="group relative flex items-center rounded-md shadow-[0_0_0_1px_theme(colors.slate.200)]"
        >
          <Text className={item({ className: 'px-1.5 py-0' })}>
            <Icon className="text-slate-500">
              <MapPin />
            </Icon>
            Locations
          </Text>
          <Select
            aria-label="Operator"
            aria-describedby={id}
            className={item()}
            buttonProps={{ className: button() }}
            defaultSelectedKey="is"
          >
            <SelectItem id="is">Is</SelectItem>
            <SelectItem id="is-not">Is not</SelectItem>
          </Select>
          <Select
            aria-label="Current value"
            aria-describedby={id}
            className={item()}
            buttonProps={{ className: button() }}
            defaultSelectedKey="online"
          >
            <SelectItem id="online">Online</SelectItem>
            <SelectItem id="meetup">Meetup</SelectItem>
          </Select>
          <IconButton
            aria-label="Remove"
            aria-describedby={id}
            className={composeTwRenderProps(button(), item())}
          >
            <X size={15} />
          </IconButton>
        </Group>
      </li>
    </ul>
  );
};
