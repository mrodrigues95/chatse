import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight } from 'lucide-react';
import { type Selection } from 'react-aria-components';

import { AccessibleIcon } from '../accessible-icon/accessible-icon';
import { Button } from '../button/button';
import { Popover } from '../popover/popover';
import { Menu, MenuItem, MenuSection, MenuSeparator, MenuTrigger, SubmenuTrigger } from './menu';

const meta = {
  component: Menu,
  title: 'Menu',
  tags: ['autodocs'],
  parameters: { controls: { include: ['selectionMode', 'placement'] } },
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

export const DisabledItems: Story = {
  ...Primary,
  args: { disabledKeys: ['save'] },
};

export const SelectionSingle: Story = {
  args: {},
  render: props => {
    const [selected, setSelected] = useState<Selection>(new Set());

    return (
      <MenuTrigger>
        <Button>Menu</Button>
        <Menu
          {...props}
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <MenuItem id="new">New…</MenuItem>
          <MenuItem id="open">Open…</MenuItem>
          <MenuItem id="save">Save</MenuItem>
          <MenuItem id="print">Print…</MenuItem>
        </Menu>
      </MenuTrigger>
    );
  },
};

export const SelectionMultiple: Story = {
  args: {},
  render: props => {
    const [selected, setSelected] = useState<Selection>(new Set(['new', 'save']));

    return (
      <MenuTrigger>
        <Button>Menu</Button>
        <Menu
          {...props}
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <MenuItem id="new">New…</MenuItem>
          <MenuItem id="open">Open…</MenuItem>
          <MenuItem id="save">Save</MenuItem>
          <MenuItem id="print">Print…</MenuItem>
        </Menu>
      </MenuTrigger>
    );
  },
};

const SubmenuIcon = (
  <AccessibleIcon className="size-3.5">
    <ChevronRight />
  </AccessibleIcon>
);

export const Submenu: Story = {
  args: {},
  render: props => (
    <MenuTrigger>
      <Button>Menu</Button>
      <Menu {...props}>
        <MenuItem id="new">New…</MenuItem>
        <SubmenuTrigger>
          <MenuItem id="open" submenuIcon={SubmenuIcon}>
            Open
          </MenuItem>
          <Popover>
            <Menu>
              <MenuItem id="open-new">Open in New Window</MenuItem>
              <MenuItem id="open-current">Open in Current Window</MenuItem>
            </Menu>
          </Popover>
        </SubmenuTrigger>
        <MenuSeparator />
        <MenuItem id="print">Print…</MenuItem>
        <SubmenuTrigger>
          <MenuItem id="share" submenuIcon={SubmenuIcon}>
            Share
          </MenuItem>
          <Popover>
            <Menu>
              <MenuItem id="sms">SMS</MenuItem>
              <MenuItem id="twitter">Twitter</MenuItem>
              <SubmenuTrigger>
                <MenuItem id="email" submenuIcon={SubmenuIcon}>
                  Email
                </MenuItem>
                <Popover>
                  <Menu>
                    <MenuItem id="work">Work</MenuItem>
                    <MenuItem id="personal">Personal</MenuItem>
                  </Menu>
                </Popover>
              </SubmenuTrigger>
            </Menu>
          </Popover>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  ),
};

export const Sections: Story = {
  args: {},
  render: props => (
    <MenuTrigger>
      <Button>Menu</Button>
      <Menu {...props}>
        <MenuSection title="Your Content">
          <MenuItem id="repos">Repositories</MenuItem>
          <MenuItem id="projects">Projects</MenuItem>
          <MenuItem id="organizations">Organizations</MenuItem>
          <MenuItem id="stars">Stars</MenuItem>
          <MenuItem id="sponsors">Sponsors</MenuItem>
        </MenuSection>
        <MenuSection title="Your Account">
          <MenuItem id="profile">Profile</MenuItem>
          <MenuItem id="status">Set status</MenuItem>
          <MenuItem id="sign-out">Sign out</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  ),
};
