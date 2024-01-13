'use server';

import { redirect } from 'next/navigation';
import { graphql } from 'relay-runtime';
import { z, ZodError } from 'zod';

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
  validationErrors?: Partial<z.infer<typeof loginSchema>>;
}

export const login = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
  try {
    const payload = loginSchema.parse(Object.fromEntries(formData.entries()));

    const result = await commitMutationAsync<actionsLoginMutation>(getRelayEnvironment(), {
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
      variables: { input: payload },
    });

    if (result.login.authPayload?.user) {
      redirect('/clubs');
    }

    return { result };
  } catch (err) {
    if (err instanceof ZodError) {
      return { validationErrors: err.flatten().fieldErrors };
    }

    throw err;
  }
};

const signUpSchema = loginSchema.extend({ name: z.string().trim().min(1).max(70) });

interface SignUpState {
  result?: actionsSignUpMutation['response'];
  validationErrors?: Partial<z.infer<typeof signUpSchema>>;
}

export const signup = async (prevState: SignUpState, formData: FormData): Promise<SignUpState> => {
  try {
    const payload = signUpSchema.parse(Object.fromEntries(formData.entries()));

    const result = await commitMutationAsync<actionsSignUpMutation>(getRelayEnvironment(), {
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
      variables: { input: payload },
    });

    if (result.signUp.authPayload?.user) {
      redirect('/clubs');
    }

    return { result };
  } catch (err) {
    if (err instanceof ZodError) {
      return { validationErrors: err.flatten().fieldErrors };
    }

    throw err;
  }
};
