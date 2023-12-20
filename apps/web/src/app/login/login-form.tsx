'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { Alert, Button, Form } from '@chatse/toolkit';
import { Spinner } from '../../components/spinner';
import { login } from './actions';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" variant="solid" isDisabled={pending}>
      {pending && <Spinner />}
      Sign in to account
    </Button>
  );
};

export const LoginForm = () => {
  const [{ result, validationErrors }, formAction] = useFormState(login, {});

  return (
    <>
      {result?.login?.errors ? (
        <Alert variant="error" className="mb-4" autoFocus>
          <Alert.Title className="text-sm">Invalid email or password.</Alert.Title>
        </Alert>
      ) : null}
      <Form action={formAction} validationErrors={validationErrors} className="w-full">
        <Form.Input label="Email address" name="email" type="email" isRequired />
        <Form.Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={6}
          isRequired
        />
        <SubmitButton />
      </Form>
    </>
  );
};
