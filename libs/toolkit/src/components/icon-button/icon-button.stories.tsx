import type { Meta, StoryObj } from '@storybook/react';
import { User2 } from 'lucide-react';

import { IconButton } from './icon-button';

const meta = {
  component: IconButton,
  title: 'IconButton',
  tags: ['autodocs'],
  args: { children: <User2 />, 'aria-label': 'User', variant: 'ghost' },
  parameters: { controls: { include: ['variant', 'size', 'radius', 'isDisabled'] } },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  render: props => (
    <div className="flex items-center gap-2">
      <IconButton size="sm" {...props} />
      <IconButton size="md" {...props} />
      <IconButton size="lg" {...props} />
    </div>
  ),
};
