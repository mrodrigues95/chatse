import type { Meta, StoryObj } from '@storybook/react';
import { User2 } from 'lucide-react';

import { AccessibleIcon } from '../accessible-icon/accessible-icon';
import { IconButton } from './icon-button';

const meta = {
  component: IconButton,
  title: 'IconButton',
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    children: (
      <AccessibleIcon>
        <User2 />
      </AccessibleIcon>
    ),
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
