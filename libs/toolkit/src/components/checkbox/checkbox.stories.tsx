import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Check, Minus } from 'lucide-react';

import { Button } from '../button/button';
import { Form } from '../form/form';
import { Checkbox, CheckboxGroup } from './checkbox';

const iconStyles = 'w-4 h-4 text-white group-disabled:text-slate-400';

const meta = {
  component: Checkbox,
  title: 'Checkbox',
  tags: ['autodocs'],
  args: {
    indeterminateIcon: <Minus aria-hidden className={iconStyles} />,
    checkIcon: <Check aria-hidden className={iconStyles} />,
  },
  parameters: { controls: { include: ['isDisabled'] } },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    isDisabled: false,
    children: 'Checkbox',
  },
};

export const Group: Story = {
  args: {},
  render: props => (
    <CheckboxGroup label="Cities">
      <Checkbox {...props} value="sf">
        San Francisco
      </Checkbox>
      <Checkbox {...props} value="ny">
        New York
      </Checkbox>
      <Checkbox {...props} value="sydney">
        Sydney
      </Checkbox>
      <Checkbox {...props} value="london">
        London
      </Checkbox>
      <Checkbox {...props} value="tokyo">
        Tokyo
      </Checkbox>
    </CheckboxGroup>
  ),
};

export const FormValidation: Story = {
  args: {},
  render: props => (
    <Form onSubmit={action('submit')}>
      <CheckboxGroup label="Cities" isRequired>
        <Checkbox {...props} value="sf">
          San Francisco
        </Checkbox>
        <Checkbox {...props} value="ny">
          New York
        </Checkbox>
        <Checkbox {...props} value="sydney">
          Sydney
        </Checkbox>
        <Checkbox {...props} value="london">
          London
        </Checkbox>
        <Checkbox {...props} value="tokyo">
          Tokyo
        </Checkbox>
      </CheckboxGroup>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};
