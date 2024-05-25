import { useNavigate } from '@tanstack/react-router';
import { graphql } from 'relay-runtime';
import { z } from 'zod';

import { type actionsLoginMutation } from '../../../__generated__/actionsLoginMutation.graphql';
import { type actionsSignUpMutation } from '../../../__generated__/actionsSignUpMutation.graphql';
import { useMutationAsync } from '../../../utils/relay/useAsyncMutation';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});

export interface LoginState {
  result?: actionsLoginMutation['response'];
  validationErrors?: z.inferFlattenedErrors<typeof loginSchema>['fieldErrors'];
  serverError?: unknown;
}

export const useLoginAction = () => {
  const navigate = useNavigate();
  const [commitAsync] = useMutationAsync<actionsLoginMutation>(graphql`
    mutation actionsLoginMutation($input: LoginInput!) {
      login(input: $input) {
        authPayload {
          user {
            id
          }
        }
        errors {
          ... on Error {
            message
          }
        }
      }
    }
  `);

  return async (prevState: LoginState, formData: FormData) => {
    const validationResult = loginSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validationResult.success) {
      return { validationErrors: validationResult.error.flatten().fieldErrors };
    }

    try {
      const result = await commitAsync({ variables: { input: validationResult.data } });
      if (result.login.authPayload?.user) {
        await navigate({ to: '/about' });
      }

      return { result };
    } catch (err) {
      return { serverError: { message: (err as Error).message } };
    }
  };
};

const signUpSchema = loginSchema.extend({ name: z.string().trim().min(1).max(70) });

export interface SignUpState {
  result?: actionsSignUpMutation['response'];
  validationErrors?: z.inferFlattenedErrors<typeof signUpSchema>['fieldErrors'];
  serverError?: unknown;
}

export const useSignUpAction = () => {
  const navigate = useNavigate();
  const [commitAsync] = useMutationAsync<actionsSignUpMutation>(graphql`
    mutation actionsSignUpMutation($input: SignUpInput!) {
      signUp(input: $input) {
        authPayload {
          user {
            id
          }
        }
        errors {
          ... on Error {
            message
          }
        }
      }
    }
  `);

  return async (prevState: SignUpState, formData: FormData) => {
    const validationResult = signUpSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validationResult.success) {
      return { validationErrors: validationResult.error.flatten().fieldErrors };
    }

    try {
      const result = await commitAsync({ variables: { input: validationResult.data } });
      if (result.signUp.authPayload?.user) {
        await navigate({ to: '/about' });
      }

      return { result };
    } catch (err) {
      return { serverError: { message: (err as Error).message } };
    }
  };
};
