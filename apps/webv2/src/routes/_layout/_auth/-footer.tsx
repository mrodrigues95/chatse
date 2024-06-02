import { useChildMatches } from '@tanstack/react-router';

import { Text } from '@chatse/toolkit';
import { Link } from '../../../components';

interface SegmentMap {
  text: string;
  linkText: string;
  linkTo: string;
}

const segmentMap: Record<string, SegmentMap> = {
  '/login/': { text: 'New to Chatse?', linkText: 'Create an account', linkTo: '/signup' },
  '/signup/': { text: 'Already have an account?', linkText: 'Sign in', linkTo: '/login' },
};

export const Footer = () => {
  const matches = useChildMatches();
  const match = matches.find(match => !!segmentMap[match.pathname]);

  if (!match) {
    return null;
  }

  const segment = segmentMap[match.pathname];

  return (
    <footer className="flex shrink-0 flex-col items-center justify-center gap-4 sm:flex-row">
      <Text className="font-medium">{segment.text}</Text>
      <Link variant="outline" to={segment.linkTo}>
        {segment.linkText}
      </Link>
    </footer>
  );
};
