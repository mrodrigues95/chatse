'use client';

import { Button, Form, Link, Text } from '@chatse/toolkit';

const Login = () => {
  return (
    <>
      <Text variant="h1" className="mb-8 text-center">
        Sign In
      </Text>
      <Form className="w-full max-w-sm">
        <Form.Input label="Email address" name="email" type="email" isRequired />
        <Form.Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          isRequired
        />
        <Button type="submit" className="w-full">
          Sign in to account
        </Button>
      </Form>
      <Link href="/">Forgot password?</Link>
    </>
  );
};

export default Login;
