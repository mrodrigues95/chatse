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
        console.error('Error while comitting async mutation', err);
        reject(err);
      },
      onCompleted: (response) => {
        // Payload errors are re-thrown within `environment.ts` and should
        // be handled above.
        resolve(response);
      },
    });
  });
