import { Text } from '@chatse/toolkit';
import { SignUpForm } from './form';

export const revalidate = 0;

const SignUp = () => (
  <>
    <Text variant="h1" className="mb-8 text-center">
      Sign Up
    </Text>
    <SignUpForm />
  </>
);

export default SignUp;
