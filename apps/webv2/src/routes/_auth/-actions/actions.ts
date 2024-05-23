import { useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from 'react-relay';
import { graphql } from 'relay-runtime';
import { z } from 'zod';

import { type actionsLoginMutation } from '../../../__generated__/actionsLoginMutation.graphql';
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

// export const login = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
//   const validationResult = loginSchema.safeParse(Object.fromEntries(formData.entries()));
//   if (!validationResult.success) {
//     return { validationErrors: validationResult.error.flatten().fieldErrors };
//   }

//   let result: actionsLoginMutation['response'];
//   try {
//     result = await commitMutationAsync<actionsLoginMutation>(getRelayEnvironment(), {
//       mutation: graphql`
//         mutation actionsLoginMutation($input: LoginInput!) {
//           login(input: $input) {
//             authPayload {
//               user {
//                 id
//               }
//             }
//             errors {
//               ... on Error {
//                 message
//               }
//             }
//           }
//         }
//       `,
//       variables: { input: validationResult.data },
//     });
//   } catch (err) {
//     return { serverError: { message: (err as Error).message } };
//   }

//   return result.login.authPayload?.user ? redirect('/') : { result };
// };

// const signUpSchema = loginSchema.extend({ name: z.string().trim().min(1).max(70) });

// interface SignUpState {
//   result?: actionsSignUpMutation['response'];
//   validationErrors?: z.inferFlattenedErrors<typeof signUpSchema>['fieldErrors'];
//   serverError?: unknown;
// }

// export const signup = async (prevState: SignUpState, formData: FormData): Promise<SignUpState> => {
//   const validationResult = signUpSchema.safeParse(Object.fromEntries(formData.entries()));
//   if (!validationResult.success) {
//     return { validationErrors: validationResult.error.flatten().fieldErrors };
//   }

//   let result: actionsSignUpMutation['response'];
//   try {
//     result = await commitMutationAsync<actionsSignUpMutation>(getRelayEnvironment(), {
//       mutation: graphql`
//         mutation actionsSignUpMutation($input: SignUpInput!) {
//           signUp(input: $input) {
//             authPayload {
//               user {
//                 id
//               }
//             }
//             errors {
//               ... on Error {
//                 message
//               }
//             }
//           }
//         }
//       `,
//       variables: { input: validationResult.data },
//     });
//   } catch (err) {
//     return { serverError: { message: (err as Error).message } };
//   }

//   return result.signUp.authPayload?.user ? redirect('/clubs') : { result };
// };
