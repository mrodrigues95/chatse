import type { Meta, StoryObj } from '@storybook/react';

import { Seperator } from './seperator';

const meta = {
  component: Seperator,
  title: 'Seperator',
} satisfies Meta<typeof Seperator>;

export default meta;

type Story = StoryObj<typeof Seperator>;

export const Primary: Story = {
  args: {},
  render: () => (
    <>
      <div className="flex flex-col">
        Content above
        <Seperator orientation="horizontal" />
        Content below
      </div>
      <div className="mt-8 flex h-10 items-center">
        Content left
        <Seperator orientation="vertical" />
        Content right
      </div>
    </>
  ),
};
