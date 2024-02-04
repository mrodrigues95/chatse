import { ChevronDown, MapPin } from 'lucide-react';
import { DialogTrigger } from 'react-aria-components';

import { Button, Dialog, Popover } from '@chatse/toolkit';
import { Icon } from '../../../components/icon/icon';

export const ActiveFilters = () => {
  return (
    <section className="flex items-center gap-2">
      <DialogTrigger>
        <Button size="xs" variant="solidBlue" className="gap-1 font-medium">
          <Icon>
            <MapPin />
          </Icon>
          Location
          <Icon>
            <ChevronDown />
          </Icon>
        </Button>
        <Popover placement="bottom right" offset={4}>
          <Dialog className='p-2 [[data-placement]>&]:p-2'>asd</Dialog>
        </Popover>
      </DialogTrigger>
      <DialogTrigger>
        <Button size="xs" variant="solid">
          Visibility
        </Button>
        <Popover showArrow>
          <Dialog>asd</Dialog>
        </Popover>
      </DialogTrigger>
    </section>
  );
};
