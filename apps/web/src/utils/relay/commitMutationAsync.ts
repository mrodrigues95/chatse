import {
  commitMutation,
  type Environment,
  type MutationConfig,
  type MutationParameters,
} from 'relay-runtime';

export const commitMutationAsync = <TMutation extends MutationParameters>(
  environment: Environment,
  config: MutationConfig<TMutation>,
) =>
  new Promise<TMutation['response']>((resolve, reject) => {
    commitMutation<TMutation>(environment, {
      ...config,
      onError: err => {
        reject(err);
      },
      onCompleted: (response, errors) => {
        if (errors) {
          reject(errors);
        } else {
          resolve(response);
        }
      },
    });
  });
