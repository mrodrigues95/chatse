import { type ReactNode } from 'react';
import { Slot, Slottable, type SlotProps } from '@radix-ui/react-slot';

export interface AccessibleIconProps extends SlotProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const AccessibleIcon = ({ children, title, description, ...props }: AccessibleIconProps) => (
  <Slot
    aria-hidden={title ? undefined : true}
    role={title ? 'img' : undefined}
    tabIndex={-1}
    {...props}
  >
    <Slottable>{children}</Slottable>
    {title && <title>{title}</title>}
    {title && description && <desc>{description}</desc>}
  </Slot>
);
