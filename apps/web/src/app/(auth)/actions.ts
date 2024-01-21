'use server';

import { redirect } from 'next/navigation';
import { graphql } from 'relay-runtime';
import { z } from 'zod';

import { type actionsLoginMutation } from '../../../__generated__/actionsLoginMutation.graphql';
import { type actionsSignUpMutation } from '../../../__generated__/actionsSignUpMutation.graphql';
import { commitMutationAsync } from '../../utils/relay/commitMutationAsync';
import { getRelayEnvironment } from '../../utils/relay/environment';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});

interface LoginState {
  result?: actionsLoginMutation['response'];
  validationErrors?: z.inferFlattenedErrors<typeof loginSchema>['fieldErrors'];
  serverError?: unknown
}

export const login = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
  const validationResult = loginSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  let result: actionsLoginMutation['response'];
  try {
    result = await commitMutationAsync<actionsLoginMutation>(getRelayEnvironment(), {
      mutation: graphql`
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
      `,
      variables: { input: validationResult.data },
    });
  } catch (err) {
    return { serverError: { message: (err as Error).message } }
  }

  return result.login.authPayload?.user ? redirect('/') : { result }
};

const signUpSchema = loginSchema.extend({ name: z.string().trim().min(1).max(70) });

interface SignUpState {
  result?: actionsSignUpMutation['response'];
  validationErrors?: z.inferFlattenedErrors<typeof signUpSchema>['fieldErrors'];
  serverError?: unknown
}

export const signup = async (prevState: SignUpState, formData: FormData): Promise<SignUpState> => {
  const validationResult = signUpSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  let result: actionsSignUpMutation['response'];
  try {

    result = await commitMutationAsync<actionsSignUpMutation>(getRelayEnvironment(), {
      mutation: graphql`
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
      `,
      variables: { input: validationResult.data },
    });
  } catch (err) {
    return { serverError: { message: (err as Error).message } }
  }

  return result.signUp.authPayload?.user ? redirect('/clubs') : { result }
};
