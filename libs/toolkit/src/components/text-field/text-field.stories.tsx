import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './text-field';

const meta = {
  component: TextField,
  title: 'TextField',
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: [
        'isDisabled',
        'isInvalid',
        'isReadOnly',
        'isRequired',
        'placeholder',
        'label',
        'description',
      ],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  args: { label: 'Name' },
};

export const WithDescription: Story = {
  args: {
    ...Primary.args,
    description: 'Name must be at least 8 characters long.',
  },
};

export const WithPlaceholder: Story = {
  args: { ...Primary.args, placeholder: 'John Doe' },
};

export const Disabled: Story = {
  args: { ...Primary.args, isDisabled: true },
};

export const Readonly: Story = {
  args: { ...Primary.args, isReadOnly: true, defaultValue: 'John Doe' },
};

export const Required: Story = {
  args: { ...Primary.args, isRequired: true },
};

export const WithError: Story = {
  args: { ...Primary.args, errorMessage: 'Please fill out this field.', isInvalid: true },
};
