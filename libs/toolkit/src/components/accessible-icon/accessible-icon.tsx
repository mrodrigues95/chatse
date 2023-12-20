import { Children, cloneElement, type ReactElement, type ReactNode } from 'react';

export interface AccessibleIconProps {
  children: ReactNode;
  label: string;
}

export const AccessibleIcon = ({ children, label }: AccessibleIconProps) => {
  const child = Children.only(children);
  return (
    <>
      {cloneElement(child as ReactElement, {
        'aria-hidden': 'true',
        'aria-label': label,
        focusable: 'false',
      })}
    </>
  );
};
