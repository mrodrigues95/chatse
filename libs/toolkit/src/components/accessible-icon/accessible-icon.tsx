import { type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface AccessibleIconProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const AccessibleIcon = ({ children, title, description }: AccessibleIconProps) => {
  // const child = Children.only(children);

  // const Component = Slot;

  return (
    <Slot aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} focusable="false">
      {/* {title && <title>{title}</title>}
      {title && description && <desc>{description}</desc>} */}
      {children}
    </Slot>
  );

  // return cloneElement(
  //   child as ReactElement,
  //   {
  //     'aria-hidden': title ? undefined : true,
  //     role: title ? 'img' : undefined,
  //     focusable: false,
  //   },
  //   // TODO: slot this.
  //   // ...Children.toArray(child),
  //   // title && <title>{title}</title>,
  // );
};
