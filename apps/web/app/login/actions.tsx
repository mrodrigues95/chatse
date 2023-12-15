'use server';

import { commitMutation, graphql } from 'relay-runtime';
import { z, ZodError } from 'zod';

import { actionsLoginMutation } from '../../__generated__/actionsLoginMutation.graphql';
import { getRelayEnvironment } from '../../src/relay/environment';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

interface State {
  result?: actionsLoginMutation['response'];
  validationErrors?: Partial<z.infer<typeof schema>>;
}

export const login = async (prevState: State, formData: FormData): Promise<State> => {
  try {
    const payload = schema.parse(Object.fromEntries(formData.entries()));

    const result = await new Promise<actionsLoginMutation['response']>((res, rej) => {
      commitMutation<actionsLoginMutation>(getRelayEnvironment(), {
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
        onError: err => {
          rej(err);
        },
        onCompleted: (response, errors) => {
          res(response);
        },
      });
    });

    return { result };
  } catch (err) {
    if (err instanceof ZodError) {
      return { validationErrors: err.flatten().fieldErrors };
    }

    throw err;
  }
};
