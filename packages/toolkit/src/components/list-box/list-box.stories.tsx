import type { Meta, StoryObj } from '@storybook/react';
import { Check } from 'lucide-react';

import { AccessibleIcon } from '../accessible-icon/accessible-icon';
import { DropdownSection, ListBox, ListBoxItem } from './list-box';

const meta = {
  component: ListBox,
  title: 'ListBox',
  tags: ['autodocs'],
  parameters: { controls: { include: ['selectionMode', 'selectionBehavior'] } },
} satisfies Meta<typeof ListBox>;

export default meta;

type Story = StoryObj<typeof ListBox>;

const SelectedIcon = (
  <AccessibleIcon className="size-3.5">
    <Check />
  </AccessibleIcon>
);

export const Primary: Story = {
  args: { selectionMode: 'multiple' },
  render: props => (
    <ListBox aria-label="Ice cream flavor" {...props}>
      <ListBoxItem id="chocolate" selectedIcon={SelectedIcon}>
        Chocolate
      </ListBoxItem>
      <ListBoxItem id="mint" selectedIcon={SelectedIcon}>
        Mint
      </ListBoxItem>
      <ListBoxItem id="strawberry" selectedIcon={SelectedIcon}>
        Strawberry
      </ListBoxItem>
      <ListBoxItem id="vanilla" selectedIcon={SelectedIcon}>
        Vanilla
      </ListBoxItem>
    </ListBox>
  ),
};

export const DisabledItems: Story = {
  ...Primary,
  args: { disabledKeys: ['mint'], selectionMode: 'multiple' },
};

export const Sections: Story = {
  args: { selectionMode: 'multiple' },
  render: props => (
    <ListBox aria-label="Sandwich contents" {...props}>
      <DropdownSection title="Veggies">
        <ListBoxItem id="lettuce" selectedIcon={SelectedIcon}>
          Lettuce
        </ListBoxItem>
        <ListBoxItem id="tomato" selectedIcon={SelectedIcon}>
          Tomato
        </ListBoxItem>
        <ListBoxItem id="onion" selectedIcon={SelectedIcon}>
          Onion
        </ListBoxItem>
      </DropdownSection>
      <DropdownSection title="Protein">
        <ListBoxItem id="ham" selectedIcon={SelectedIcon}>
          Ham
        </ListBoxItem>
        <ListBoxItem id="tuna" selectedIcon={SelectedIcon}>
          Tuna
        </ListBoxItem>
        <ListBoxItem id="tofu" selectedIcon={SelectedIcon}>
          Tofu
        </ListBoxItem>
      </DropdownSection>
    </ListBox>
  ),
};
