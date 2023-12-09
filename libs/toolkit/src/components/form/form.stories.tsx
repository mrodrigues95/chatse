import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'react-aria-components';

import { Form } from './form';

const meta = {
  component: Form,
  title: 'Form',
  argTypes: { onSubmit: { action: 'submit' } },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  render: ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
      <Form.Input label="Name" name="name" isRequired />
      <Form.Input label="Email" type="email" name="email" isRequired />
      <Button type="submit">Submit</Button>
    </Form>
  ),
};

export const WithHTMLConstraintValidation: Story = {
  render: ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
      <Form.Input
        label="Username"
        name="username"
        description="Enter a username between 4 and 8 characters long."
        minLength={4}
        maxLength={8}
        isRequired
      />
      <Button type="submit">Submit</Button>
    </Form>
  ),
};

export const WithCustomFieldValidator: Story = {
  render: ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
      <Form.Input
        label="Username"
        name="username"
        description='Enter "admin" to trigger the customer validator.'
        validate={value => (value === 'admin' ? 'Nice try!' : null)}
      />
      <Button type="submit">Submit</Button>
    </Form>
  ),
};

export const WithCustomErrorMessages: Story = {
  render: ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
      <Form.Input
        label="Username"
        name="username"
        errorMessage={result =>
          result.validationDetails.valueMissing ? 'Please enter a name.' : ''
        }
        isRequired
      />
      <Button type="submit">Submit</Button>
    </Form>
  ),
};
