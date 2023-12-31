import { Children, cloneElement, type ReactElement, type ReactNode } from 'react';

export interface AccessibleIconProps {
  children: ReactNode;
  label?: string;
}

export const AccessibleIcon = ({ children, label }: AccessibleIconProps) => {
  const child = Children.only(children);
  return (
    <>
      {cloneElement(child as ReactElement, {
        'aria-hidden': 'true',
        focusable: 'false',
      })}
      {label && <span className="sr-only">{label}</span>}
    </>
  );
};
