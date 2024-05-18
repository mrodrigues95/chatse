import { Form as AriaForm, type FormProps as AriaFormProps } from 'react-aria-components';

import { cn } from '../../utils/cn';
import { TextField } from '../text-field/text-field';

export interface FormProps extends AriaFormProps {}

export const Form = ({ className, onSubmit, ...props }: FormProps) => (
  <AriaForm
    className={cn('space-y-4', className)}
    onSubmit={e => {
      if (onSubmit) {
        e.preventDefault();
        return onSubmit?.(e);
      }
    }}
    {...props}
  />
);

Form.TextField = TextField;
