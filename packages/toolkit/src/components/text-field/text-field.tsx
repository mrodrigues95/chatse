import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';

import { composeTwRenderProps } from '../../utils/cn';
import {
  Description,
  FieldError,
  Label,
  type DescriptionProps,
  type FieldErrorProps,
  type LabelProps,
} from '../field/field';
import { Input, type InputProps } from '../input/input';

export interface TextFieldProps extends AriaTextFieldProps {
  label: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: InputProps['placeholder'];
  labelProps?: LabelProps;
  inputProps?: InputProps;
  descriptionProps?: DescriptionProps;
  fieldErrorProps?: FieldErrorProps;
}

export const TextField = ({
  label,
  description,
  errorMessage,
  placeholder,
  isRequired,
  labelProps,
  inputProps,
  descriptionProps,
  fieldErrorProps,
  ...props
}: TextFieldProps) => (
  <AriaTextField
    isRequired={isRequired}
    {...props}
    className={composeTwRenderProps('group flex w-full max-w-sm flex-col gap-1', props.className)}
  >
    <Label {...labelProps}>
      {label} {isRequired && <i aria-hidden="true">*</i>}
    </Label>
    <Input {...inputProps} placeholder={placeholder} />
    {description && <Description {...descriptionProps}>{description}</Description>}
    <FieldError {...fieldErrorProps}>{errorMessage}</FieldError>
  </AriaTextField>
);
