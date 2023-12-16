import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './alert';

const meta = {
  component: Alert,
  title: 'Alert',
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  args: {},
  render: props => (
    <Alert {...props}>
      <Alert.Title>Payment Information</Alert.Title>
      <Alert.Content>
        Enter your billing address, shipping address, and payment method to complete your purchase.
      </Alert.Content>
    </Alert>
  ),
};
