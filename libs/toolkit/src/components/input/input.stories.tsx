import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta = {
  component: Input,
  title: 'Input',
  tags: ['autodocs'],
  parameters: { controls: { include: ['disabled', 'density', 'placeholder'] } },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: { 'aria-label': 'input', density: 'loose' },
};

export const Compact: Story = {
  ...Primary,
  args: { ...Primary.args, density: 'compact' },
};
