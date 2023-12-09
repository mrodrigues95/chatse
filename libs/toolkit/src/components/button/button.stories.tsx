import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta = {
  component: Button,
  title: 'Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Press me!' },
};
