import { cn } from '@chatse/toolkit';
import { Icon } from './icon';
import type { IconProps } from './icon';

interface SpinnerProps extends Omit<IconProps, 'name' | 'label'> {}

export const Spinner = (props: SpinnerProps) => (
  <Icon
    {...props}
    name="loader-2"
    label="Loading"
    className={cn('animate-spin', props.className)}
  />
);
