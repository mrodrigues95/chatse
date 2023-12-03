import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Text',
};

export default meta;

type Story = StoryObj<typeof Text>;

const TextWithVariants = () => (
  <div className="flex flex-col">
    <Text variant="h1">This is heading level 1.</Text>
    <Text variant="h2">This is heading level 2.</Text>
    <Text variant="h3">This is heading level 3.</Text>
    <Text variant="h4">This is heading level 4.</Text>
    <Text variant="h5">This is heading level 5.</Text>
    <Text variant="h6">This is heading level 6.</Text>
    <Text variant="p">This is a paragraph..</Text>
  </div>
);

export const Primary: Story = {
  args: {},
  render: TextWithVariants,
};
