import { type ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export interface SeperatorProps extends ComponentProps<'hr'> {
  orientation?: 'vertical' | 'horizontal';
}

export const Seperator = ({ orientation = 'horizontal', className, ...props }: SeperatorProps) => {
  return (
    <hr
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      className={cn(
        'bg-slate-200',
        orientation === 'vertical' ? 'mx-2 h-full w-[1px]' : 'my-2 h-[1px] w-full',
        className,
      )}
      {...props}
    />
  );
};
