/* eslint-disable relay/unused-fields */
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchQuery, graphql } from 'relay-runtime';

import { type LayoutMeQuery } from '../__generated__/LayoutMeQuery.graphql';

const query = graphql`
  query LayoutMeQuery {
    me {
      id
      name
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
