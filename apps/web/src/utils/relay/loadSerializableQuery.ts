'use server';

import { redirect } from 'next/navigation';
import { GraphQLResponse, OperationType, RequestParameters, VariablesOf } from 'relay-runtime';
import { ConcreteRequest } from 'relay-runtime/lib/util/RelayConcreteNode';

import { tryRemoveIdentityCookie } from './cookies';
import { networkFetch } from './environment';

export interface SerializablePreloadedQuery<
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
> {
  params: TRequest['params'];
  variables: VariablesOf<TQuery>;
  response: GraphQLResponse;
}

// Call into raw network fetch to get serializable GraphQL query response
// This response will be sent to the client to "warm" the QueryResponseCache
// to avoid the client fetches.
export const loadSerializableQuery = async <
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
>(
  params: RequestParameters,
  variables: VariablesOf<TQuery>,
): Promise<SerializablePreloadedQuery<TRequest, TQuery>> => {
  try {
    const response = await networkFetch(params, variables);
    return {
      params,
      variables,
      response,
    };
  } catch (err) {
    if (err instanceof Response) {
      if (err.status === 401) {
        tryRemoveIdentityCookie();
        redirect('/login');
      }
    }

    throw err;
  }
};
