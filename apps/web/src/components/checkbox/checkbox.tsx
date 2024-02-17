import { Check, Minus } from 'lucide-react';

import { Checkbox as TKCheckbox, type CheckboxProps as TKCheckboxProps } from '@chatse/toolkit';
import { Icon } from '../icon/icon';

const iconStyles = 'w-4 h-4 text-white group-disabled:text-slate-400';

interface CheckboxProps extends TKCheckboxProps {

}

export const Checkbox = (props: CheckboxProps) => (
  <TKCheckbox
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
