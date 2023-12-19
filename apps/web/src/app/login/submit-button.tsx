'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@chatse/toolkit';
import { Spinner } from '../../components/spinner';

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" variant="solid" isDisabled={pending}>
      {pending && <Spinner />}
      Sign in to account
    </Button>
  );
};
