import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta = {
  component: Text,
  title: 'Text',
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

const TextWithVariants = () => (
  <div className="flex flex-col">
    <Text variant="hero">hero</Text>
    <Text variant="title">title</Text>
    <Text variant="subtitle">subtitle</Text>
    <Text variant="body">body</Text>
    <Text variant="muted">muted</Text>
  </div>
);

export const Primary: Story = {
  args: {},
  render: TextWithVariants,
};
