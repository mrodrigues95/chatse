'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { Alert, Form } from '@chatse/toolkit';
import { SubmitButton, useToast } from '../../../components';
import { signup } from '../actions';

// TODO: Remove name/password fields when the email confirmation flow is finished.
// Those two fields will be part of the confirmation page instead (after the user checks their email for a link).
export const SignUpForm = () => {
  const [{ result, validationErrors, serverError }, submit] = useFormState(signup, {});
  const { toast } = useToast();

  useEffect(() => {
    if (serverError) {
      toast.add({ variant: 'error' });
    }
  }, [serverError, toast]);

  return (
    <>
      {result?.signUp?.errors ? (
        <Alert variant="error" className="mb-4" autoFocus>
          <Alert.Title className="text-sm">
            There was a problem creating your account. Please try again.
          </Alert.Title>
        </Alert>
      ) : null}
      <Form action={submit} validationErrors={validationErrors} className="w-full">
        <Form.TextField label="Name" name="name" maxLength={70} isRequired />
        <Form.TextField label="Email address" name="email" type="email" isRequired />
        <Form.TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={6}
          isRequired
        />
        <SubmitButton className="w-full" variant="solid">
          Create your account
        </SubmitButton>
      </Form>
    </>
  );
};
