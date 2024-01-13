import { type ReactNode } from 'react';

export const revalidate = 0;

const CommunityPage = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      community
      {children}
    </div>
  );
};

export default CommunityPage;
