'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { Text } from '@chatse/toolkit';
import { Link } from '../../components/link';

const segmentMap = {
  login: { text: 'New to Chatse?', actionText: 'Create an account', actionHref: '/signup' },
  signup: { text: 'Already have an account?', actionText: 'Sign in', actionHref: '/login' },
};

export const Footer = () => {
  const segment = useSelectedLayoutSegment();

  if (!segment) {
    return null;
  }

  const key = segmentMap[segment as keyof typeof segmentMap];

  return (
    <>
      <Text variant="p" as="span" className="text-sm font-semibold">
        {key.text}
      </Text>
      <Link variant="outline" href={key.actionHref}>
        {key.actionText}
      </Link>
    </>
  );
};
