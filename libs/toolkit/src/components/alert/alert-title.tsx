'use client';

import { type ComponentProps } from 'react';

import { alertVariants, useAlert } from './alert';

interface AlertTitleProps extends ComponentProps<'h3'> {}

export const AlertTitle = ({ className, children, ...props }: AlertTitleProps) => {
  const ctx = useAlert();

  if (!ctx) {
    throw new Error('<Alert.Title /> can only be used as a child of <Alert />.');
  }

  const { variant } = ctx;
  const { title } = alertVariants({ variant, className });

  return (
    <h3 className={title()} {...props}>
      {children}
    </h3>
  );
};
