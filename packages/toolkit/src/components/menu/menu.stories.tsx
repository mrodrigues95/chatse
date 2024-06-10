import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/button';
import { Menu, MenuItem, MenuSeparator, MenuTrigger } from './menu';

const meta = {
  component: Menu,
  title: 'Menu',
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof Menu>;

export const Primary: Story = {
  args: {},
  render: props => (
    <MenuTrigger>
      <Button>Menu</Button>
      <Menu {...props}>
        <MenuItem id="new">New…</MenuItem>
        <MenuItem id="open">Open…</MenuItem>
        <MenuSeparator />
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="saveAs">Save as…</MenuItem>
        <MenuSeparator />
        <MenuItem id="print">Print…</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
};
