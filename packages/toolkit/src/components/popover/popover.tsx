import { type ReactNode } from 'react';
import {
  Popover as AriaPopover,
  composeRenderProps,
  OverlayArrow,
  type PopoverProps as AriaPopoverProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const popoverVariants = tv({
  base: 'rounded-md border border-slate-300 bg-white bg-clip-padding text-slate-700 shadow-lg',
  variants: {
    isEntering: {
      true: 'animate-in fade-in zoom-in-95 duration-200 ease-out',
    },
    isExiting: {
      true: 'animate-out zoom-out-95 fade-out duration-100 ease-in',
    },
  },
});

export interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
  showArrow?: boolean;
  children: ReactNode;
}

export const Popover = ({ children, showArrow, ...props }: PopoverProps) => {
  return (
    <AriaPopover
      offset={showArrow ? 12 : 8}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        popoverVariants({ ...renderProps, className }),
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 block fill-white stroke-black/10 stroke-1"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaPopover>
  );
};
