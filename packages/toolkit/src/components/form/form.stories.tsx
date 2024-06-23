import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDown } from 'lucide-react';

import { AccessibleIcon } from '../accessible-icon/accessible-icon';
import { Button } from '../button/button';
import { SelectItem } from '../select/select';
import { Form } from './form';

const meta = {
  component: Form,
  title: 'Form',
  tags: ['autodocs'],
  argTypes: { onSubmit: { action: 'submit' } },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  render: ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
      <Form.TextField label="Name" name="name" isRequired />
      <Form.TextField label="Email" type="email" name="email" isRequired />
      <Form.Select
        label="Gender"
        icon={
          <AccessibleIcon>
            <ChevronsUpDown className="size-4 text-gray-600 group-disabled:text-gray-200" />
          </AccessibleIcon>
        }
        isRequired
      >
        <SelectItem id="male">Male</SelectItem>
        <SelectItem id="female">Female</SelectItem>
      </Form.Select>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};

export const WithHTMLConstraintValidation: Story = {
  render: ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
      <Form.TextField
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
      <Form.TextField
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
      <Form.TextField
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
