import { useMemo } from 'react';
import {
  Environment,
  Network,
  QueryResponseCache,
  RecordSource,
  Store,
  type CacheConfig,
  type GraphQLResponse,
  type GraphQLSingularResponse,
  type PayloadError,
  type RequestParameters,
  type Variables,
} from 'relay-runtime';

import { trySetIdentityCookie } from './cookies';

interface GraphQLPayloadError extends PayloadError {
  path?: string[];
  extensions?: Record<string, string>;
}

// TODO: make this an env variable.
const HTTP_ENDPOINT = 'http://localhost:5000/api/graphql';
const IS_SERVER = typeof window === 'undefined';
const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results.

export const networkFetch = async (
  request: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse> => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  if (IS_SERVER) {
    trySetIdentityCookie(resp);
  }

  const json: GraphQLSingularResponse = await resp.json();

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if ('errors' in json && Array.isArray(json.errors)) {
    const unauthorized = (json.errors as GraphQLPayloadError[]).find(
      err => err.extensions?.code === 'AUTH_NOT_AUTHORIZED',
    );

    if (unauthorized) {
      throw new Response('Unauthorized', { status: 401 });
    }

    throw new Error(
      `Error executing GraphQL query '${request.name}' with variables '${JSON.stringify(
        variables,
      )}': ${JSON.stringify(json.errors)}`,
    );
  }

  return json;
};

const createNetwork = (responseCache: QueryResponseCache) => {
  async function fetchResponse(
    params: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
  ) {
    const isQuery = params.operationKind === 'query';
    const cacheKey = params.id ?? params.cacheID;
    const forceFetch = cacheConfig && cacheConfig.force;
    if (responseCache !== null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(cacheKey, variables);
      if (fromCache !== null) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(params, variables);
  }

  const network = Network.create(fetchResponse);
  return network;
};

const createQueryCache = () =>
  new QueryResponseCache({
    size: 100,
    ttl: CACHE_TTL,
  });

const responseCacheByEnvironment = new WeakMap<Environment, QueryResponseCache>();

const createEnvironment = () => {
  const cache = createQueryCache();
  const network = createNetwork(cache);
  const store = new Store(RecordSource.create());

  const environment = new Environment({
    network,
    store,
    isServer: IS_SERVER,
  });

  responseCacheByEnvironment.set(environment, cache);

  return environment;
};

let relayEnvironment: Environment | null = null;

export const getRelayEnvironment = () => {
  if (IS_SERVER) {
    return createEnvironment();
  }

  relayEnvironment ??= createEnvironment();

  return relayEnvironment;
};

export const useEnvironment = () => useMemo(() => getRelayEnvironment(), []);

export const getCacheByEnvironment = (environment: Environment) =>
  responseCacheByEnvironment.get(environment);
