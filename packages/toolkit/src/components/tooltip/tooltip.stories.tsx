import type { Meta, StoryObj } from '@storybook/react';
import { PrinterIcon, SaveIcon } from 'lucide-react';

import { Button } from '../button/button';
import { Tooltip, TooltipTrigger } from './tooltip';

const meta = {
  component: Tooltip,
  title: 'Tooltip',
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {},
  render: props => (
    <div className="flex gap-2">
      <TooltipTrigger>
        <Button variant="outline" className="px-2">
          <SaveIcon className="size-5" />
        </Button>
        <Tooltip {...props}>Save</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline" className="px-2">
          <PrinterIcon className="size-5" />
        </Button>
        <Tooltip {...props}>Print</Tooltip>
      </TooltipTrigger>
    </div>
  ),
};
