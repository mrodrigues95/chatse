'use client';

import { useFormState } from 'react-dom';

import { Alert, Form } from '@chatse/toolkit';
import { SubmitButton } from '../../../components/submit-button';
import { login } from '../actions';

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
        <SubmitButton className="w-full" variant="solid">
          Sign in to account
        </SubmitButton>
      </Form>
    </>
  );
};
