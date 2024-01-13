'use client';

import { useFormStatus } from 'react-dom';

import { Button, type ButtonProps } from '@chatse/toolkit';
import { Spinner } from '../spinner/spinner';

interface SubmitButtonProps extends ButtonProps {}

export const SubmitButton = ({ isDisabled, children, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isDisabled={pending || isDisabled} {...props}>
      {props => (
        <>
          {pending && <Spinner />}
          {typeof children === 'function' ? children(props) : children}
        </>
      )}
    </Button>
  );
};
