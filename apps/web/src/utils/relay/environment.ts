import {
  Environment,
  Network,
  RecordSource,
  Store,
  type GraphQLResponse,
  type GraphQLSingularResponse,
  type PayloadError,
  type RequestParameters,
  type Variables,
} from 'relay-runtime';

interface GraphQLPayloadError extends PayloadError {
  path?: string[];
  extensions?: Record<string, string>;
}

const networkFetch = async (
  request: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse> => {
  const resp = await fetch(import.meta.env.VITE_API_ENDPOINT, {
    cache: 'no-store',
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

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

const createEnvironment = () => {
  const network = Network.create(networkFetch);
  const store = new Store(new RecordSource(), { gcReleaseBufferSize: 10 });
  return new Environment({ store, network });
};

export const relayEnvironment = createEnvironment();
