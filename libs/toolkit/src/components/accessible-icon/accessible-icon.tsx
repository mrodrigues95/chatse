import { Children, cloneElement, type ReactElement, type ReactNode } from 'react';

export interface AccessibleIconProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const AccessibleIcon = ({ children, title, description }: AccessibleIconProps) => {
  const child = Children.only(children);
  return cloneElement(
    child as ReactElement,
    {
      'aria-hidden': title ? undefined : true,
      role: title ? 'img' : undefined,
      focusable: false,
    },
    // TODO: slot this.
    // ...Children.toArray(child),
    // title && <title>{title}</title>,
  );
};
