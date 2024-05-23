import { useMutation, type UseMutationConfig } from 'react-relay';
import {
  type Disposable,
  type GraphQLTaggedNode,
  type IEnvironment,
  type MutationConfig,
  type MutationParameters,
} from 'relay-runtime';

export const useMutationAsync = <TMutation extends MutationParameters>(
  mutation: GraphQLTaggedNode,
  commitMutationFn?: (environment: IEnvironment, config: MutationConfig<TMutation>) => Disposable,
): [(config: UseMutationConfig<TMutation>) => Promise<TMutation['response']>, boolean] => {
  const [commit, isPending] = useMutation<TMutation>(mutation, commitMutationFn);

  const commitMutationAsync = (options: UseMutationConfig<TMutation>) => {
    return new Promise<TMutation['response']>((resolve, reject) => {
      commit({
        ...options,
        onError: (error: Error) => {
          reject(error);
        },
        onCompleted: (response: TMutation['response']) => {
          resolve(response);
        },
      });
    });
  };

  return [commitMutationAsync, isPending];
};
