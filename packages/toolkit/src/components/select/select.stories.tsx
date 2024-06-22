import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDown } from 'lucide-react';

import { AccessibleIcon } from '../accessible-icon/accessible-icon';
import { Select, SelectItem, SelectSection } from './select';

const meta = {
  component: Select,
  title: 'Select',
  tags: ['autodocs'],
  parameters: {
    controls: { include: ['label', 'description', 'placeholder', 'isDisabled', 'isRequired'] },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

const icon = (
  <AccessibleIcon>
    <ChevronsUpDown className="size-4 text-gray-600 group-disabled:text-gray-200" />
  </AccessibleIcon>
);

export const Primary: Story = {
  args: { icon, 'aria-label': 'Favourite Flavours' },
  render: props => (
    <Select {...props}>
      <SelectItem id="chocolate">Chocolate</SelectItem>
      <SelectItem id="mint">Mint</SelectItem>
      <SelectItem id="strawberry">Strawberry</SelectItem>
      <SelectItem id="vanilla">Vanilla</SelectItem>
    </Select>
  ),
};

export const Sections: Story = {
  args: { icon, label: 'Preferred fruit or vegetable' },
  render: props => (
    <Select {...props}>
      <SelectSection title="Fruit">
        <SelectItem id="Apple">Apple</SelectItem>
        <SelectItem id="Banana">Banana</SelectItem>
        <SelectItem id="Orange">Orange</SelectItem>
        <SelectItem id="Honeydew">Honeydew</SelectItem>
        <SelectItem id="Grapes">Grapes</SelectItem>
        <SelectItem id="Watermelon">Watermelon</SelectItem>
        <SelectItem id="Cantaloupe">Cantaloupe</SelectItem>
        <SelectItem id="Pear">Pear</SelectItem>
      </SelectSection>
      <SelectSection title="Vegetable">
        <SelectItem id="Cabbage">Cabbage</SelectItem>
        <SelectItem id="Broccoli">Broccoli</SelectItem>
        <SelectItem id="Carrots">Carrots</SelectItem>
        <SelectItem id="Lettuce">Lettuce</SelectItem>
        <SelectItem id="Spinach">Spinach</SelectItem>
        <SelectItem id="Bok Choy">Bok Choy</SelectItem>
        <SelectItem id="Cauliflower">Cauliflower</SelectItem>
        <SelectItem id="Potatoes">Potatoes</SelectItem>
      </SelectSection>
    </Select>
  ),
};
