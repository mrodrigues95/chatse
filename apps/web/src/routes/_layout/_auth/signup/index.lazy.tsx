import { createLazyFileRoute } from '@tanstack/react-router';

import { Text } from '@chatse/toolkit';
import { SignUpForm } from './-form';

const SignUp = () => (
  <>
    <Text variant="title" className="mb-8 text-center">
      Sign Up
    </Text>
    <SignUpForm />
  </>
);

export const Route = createLazyFileRoute('/_layout/_auth/signup/')({
  component: SignUp,
});
