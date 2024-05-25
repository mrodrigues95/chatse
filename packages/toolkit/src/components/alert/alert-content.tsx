import { type ComponentProps } from 'react';

import { alertVariants, useAlert } from './alert';

interface AlertContentProps extends ComponentProps<'section'> {}

export const AlertContent = ({ className, children, ...props }: AlertContentProps) => {
  const ctx = useAlert();

  if (!ctx) {
    throw new Error('<Alert.Content /> can only be used as a child of <Alert />.');
  }

  const { variant } = ctx;
  const { content } = alertVariants({ variant });

  return (
    <section className={content({ className })} {...props}>
      {children}
    </section>
  );
};
