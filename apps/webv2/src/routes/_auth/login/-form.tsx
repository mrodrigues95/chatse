import { useActionState, useEffect } from 'react';

import { Alert, Form } from '@chatse/toolkit';
import { useLoginAction, type LoginState } from '../-actions/actions';
import { SubmitButton, useToast } from '../../../components';

export const LoginForm = () => {
  const { toast } = useToast();
  const login = useLoginAction();
  const [{ result, serverError, validationErrors }, submit] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  useEffect(() => {
    if (serverError) {
      toast.add({ variant: 'error' });
    }
  }, [serverError, toast]);

  return (
    <>
      {result?.login?.errors ? (
        <Alert variant="error" className="mb-4" autoFocus>
          <Alert.Title className="text-sm">Invalid email or password.</Alert.Title>
        </Alert>
      ) : null}
      <Form action={submit} validationErrors={validationErrors} className="w-full">
        <Form.TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="username"
          isRequired
        />
        <Form.TextField
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
