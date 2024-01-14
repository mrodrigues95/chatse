import { LucideLoader2 } from 'lucide-react';

import { cn } from '@chatse/toolkit';
import { Icon, type IconProps } from '../icon/icon';

interface SpinnerProps extends Omit<IconProps, 'title' | 'description' | 'children'> {}

export const Spinner = (props: SpinnerProps) => (
  <Icon {...props} title="Loading" className={cn('animate-spin', props.className)}>
    <LucideLoader2 />
  </Icon>
);
