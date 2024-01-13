import { cn } from '@chatse/toolkit';
import { Icon, type IconProps } from '../icon/icon';

interface SpinnerProps extends Omit<IconProps, 'name' | 'label'> {}

export const Spinner = (props: SpinnerProps) => (
  <Icon {...props} name="Loader2" title="Loading" className={cn('animate-spin', props.className)} />
);
