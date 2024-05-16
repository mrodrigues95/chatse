import type { Meta, StoryObj } from '@storybook/react';
import { HelpCircle } from 'lucide-react';
import { DialogTrigger, Heading } from 'react-aria-components';

import { Dialog } from '../dialog/dialog';
import { IconButton } from '../icon-button/icon-button';
import { Text } from '../text/text';
import { Popover } from './popover';

const meta = {
  component: Popover,
  title: 'Popover',
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof Popover>;

export const Primary: Story = {
  args: {},
  render: props => (
    <DialogTrigger>
      <IconButton aria-label="Help">
        <HelpCircle className="h-4 w-4" />
      </IconButton>
      <Popover {...props}>
        <Dialog>
          <Text variant="title" className="text-lg" asChild>
            <Heading slot="title" level={2}>
              Help
            </Heading>
          </Text>
          <Text variant="body" className="text-sm">
            For help accessing your account, please contact support.
          </Text>
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};
