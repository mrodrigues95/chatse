'use client';

import { Button, Form, Text } from '@chatse/toolkit';
import { Link } from '../../src/components/link';

const Login = () => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <Text variant="h1" className="mb-8 text-center">
          Sign In
        </Text>
        <Form className="w-full">
          <Form.Input label="Email address" name="email" type="email" isRequired />
          <Form.Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            isRequired
          />
          <Button type="submit" className="w-full" variant="solid">
            Sign in to account
          </Button>
        </Form>
        <Link href="/" size="xs" className="mx-auto mt-2.5 block w-max">
          Forgot password?
        </Link>
        <hr className="my-8 w-full border border-slate-200" />
        <div>
          <Button variant="outline" className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Login;
