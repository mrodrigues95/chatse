'use client';

import { ChevronDown, MapPin, X } from 'lucide-react';
import {
  Checkbox,
  CheckboxGroup,
  composeRenderProps,
  DialogTrigger,
  Group,
} from 'react-aria-components';

import { Button, buttonVariants, Dialog, IconButton, Label, Popover, Text } from '@chatse/toolkit';
import { Icon } from '../../../components/icon/icon';

export const ActiveFilters = () => {
  return (
    <ul className="flex items-center gap-2" aria-label="Your current filters">
      <li>
        <Group
          className={composeRenderProps(
            'group gap-2.5 text-xs text-slate-500 hover:cursor-pointer hover:text-slate-900',
            (className, renderProps) =>
              buttonVariants({ ...renderProps, variant: 'outline', size: 'xs', className }),
          )}
        >
          <DialogTrigger>
            <Button
              size="xs"
              variant="outline"
              className="gap-1.5 border-0 p-0 font-semibold text-slate-500 shadow-none hover:text-slate-900 focus-visible:text-slate-900"
            >
              <Icon size="sm">
                <MapPin />
              </Icon>
              Location
              <Text
                variant="body"
                className="rounded-md bg-slate-100 px-1.5 py-0.5 text-center text-xs font-semibold text-slate-900 transition duration-150 group-hover:bg-slate-200"
                aria-label="Four location filters selected"
              >
                4
              </Text>
              <Icon size="sm">
                <ChevronDown />
              </Icon>
            </Button>
            <Popover placement="bottom right" offset={10}>
              <Dialog className="p-2 [[data-placement]>&]:p-2">
                <CheckboxGroup>
                  <Label className="font-medium">Location</Label>
                  <Checkbox value="online">Online</Checkbox>
                </CheckboxGroup>
              </Dialog>
            </Popover>
          </DialogTrigger>
          <IconButton
            aria-label="Remove location filter"
            className="rounded-sm bg-transparent p-0 opacity-60 hover:bg-transparent hover:opacity-100 focus-visible:opacity-100"
            size="xs"
          >
            <X />
          </IconButton>
        </Group>
      </li>
    </ul>
  );
};
