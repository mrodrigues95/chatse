import type { Meta, StoryObj } from '@storybook/react';
import { User2 } from 'lucide-react';

import { IconButton } from './icon-button';

const meta = {
  component: IconButton,
  title: 'IconButton',
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    children: <User2 />,
    'aria-label': 'User',
    variant: 'ghost',
  },
  render: props => (
    <div className="flex items-center gap-2">
      <IconButton size="sm" {...props} />
      <IconButton size="md" {...props} />
      <IconButton size="lg" {...props} />
    </div>
  ),
};
