import { Check, Minus } from 'lucide-react';

import {
  Checkbox as ToolKitCheckbox,
  type CheckboxProps as ToolKitCheckboxProps,
} from '@chatse/toolkit';
import { Icon } from '../icon/icon';

const iconStyles = 'w-4 h-4 text-white group-disabled:text-slate-400';

interface CheckboxProps extends ToolKitCheckboxProps {}

export const Checkbox = (props: CheckboxProps) => (
  <ToolKitCheckbox
    {...props}
    indeterminateIcon={
      <Icon>
        <Minus />
      </Icon>
    }
    checkIcon={
      <Icon>
        <Check />
      </Icon>
    }
  />
);
