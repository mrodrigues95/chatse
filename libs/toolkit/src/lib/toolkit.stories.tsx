import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { Toolkit } from './toolkit';

const meta: Meta<typeof Toolkit> = {
  component: Toolkit,
  title: 'Toolkit',
};
export default meta;
type Story = StoryObj<typeof Toolkit>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Toolkit!/gi)).toBeTruthy();
  },
};
