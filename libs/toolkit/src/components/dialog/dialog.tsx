'use client';

import { Dialog as AriaDialog, type DialogProps as AriaDialogProps } from 'react-aria-components';

import { cn } from '../../utils/cn';

export interface DialogProps extends AriaDialogProps {}

export const Dialog = (props: DialogProps) => (
  <AriaDialog
    {...props}
    className={cn(
      'relative max-h-[inherit] overflow-auto p-6 outline outline-0 [[data-placement]>&]:p-4',
      props.className,
    )}
  />
);
