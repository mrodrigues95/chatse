import { type ReactNode } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';

export interface AccessibleIconProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const AccessibleIcon = ({ children, title, description }: AccessibleIconProps) => (
  <Slot aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} tabIndex={-1}>
    <Slottable>{children}</Slottable>
    {title && <title>{title}</title>}
    {title && description && <desc>{description}</desc>}
  </Slot>
);
