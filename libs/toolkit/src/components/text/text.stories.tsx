import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta = {
  component: Text,
  title: 'Text',
  tags: ['autodocs'],
  parameters: { controls: { include: [] } },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {},
  render: props => (
    <div className="flex flex-col">
      <Text variant="hero" {...props}>
        hero
      </Text>
      <Text variant="title" {...props}>
        title
      </Text>
      <Text variant="subtitle" {...props}>
        subtitle
      </Text>
      <Text variant="body" {...props}>
        body
      </Text>
      <Text variant="muted" {...props}>
        muted
      </Text>
    </div>
  ),
};
