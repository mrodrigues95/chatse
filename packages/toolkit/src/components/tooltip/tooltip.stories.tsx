import type { Meta, StoryObj } from '@storybook/react';
import { PrinterIcon, SaveIcon } from 'lucide-react';

import { IconButton } from '../icon-button/icon-button';
import { Tooltip, TooltipTrigger } from './tooltip';

const meta = {
  component: Tooltip,
  title: 'Tooltip',
  tags: ['autodocs'],
  parameters: { controls: { include: ['showArrow', 'placement'] } },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {},
  render: props => (
    <TooltipTrigger>
      <IconButton variant="default" aria-label="Save" size="md">
        <SaveIcon />
      </IconButton>
      <Tooltip {...props}>Save</Tooltip>
    </TooltipTrigger>
  ),
};
