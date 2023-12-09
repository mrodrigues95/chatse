import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './link';

const meta = {
  component: Link,
  title: 'Link',
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  args: { children: 'Press me!', href: '#' },
};
