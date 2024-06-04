import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchQuery, graphql } from 'relay-runtime';

import { type LayoutMeQuery } from '../__generated__/LayoutMeQuery.graphql';

const query = graphql`
  query LayoutMeQuery {
    me {
      __typename
    }
  }
`;

export const Route = createFileRoute('/_layout')({
  beforeLoad: async ({ context }) => {
    const result = await fetchQuery<LayoutMeQuery>(
      context.relay,
      query,
      {},
      { fetchPolicy: 'store-or-network' },
    ).toPromise();
    return { auth: { isLoggedIn: !!result?.me } };
  },
  component: () => <Outlet />,
});
