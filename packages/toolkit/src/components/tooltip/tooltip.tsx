import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  composeRenderProps,
  OverlayArrow,
  type TooltipProps as AriaTooltipProps,
  type TooltipTriggerComponentProps as AriaTooltipTriggerComponentProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const tooltipVariants = tv({
  base: 'group rounded-md bg-slate-900 px-2 py-1 text-sm text-white shadow-[inset_0_1px_0_0_theme(colors.gray.900)] drop-shadow-lg will-change-transform',
  variants: {
    isEntering: {
      true: 'animate-in fade-in placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5 placement-left:slide-in-from-right-0.5 placement-right:slide-in-from-left-0.5 duration-200 ease-out',
    },
    isExiting: {
      true: 'animate-out fade-out placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5 placement-left:slide-out-to-right-0.5 placement-right:slide-out-to-left-0.5 duration-150 ease-in',
    },
  },
});

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  showArrow?: boolean;
  children: React.ReactNode;
}

export function Tooltip({ children, showArrow = true, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      offset={10}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tooltipVariants({ ...renderProps, className }),
      )}
    >
      {showArrow && (
        <OverlayArrow>
          <svg
            width={8}
            height={8}
            viewBox="0 0 8 8"
            className="group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 fill-slate-900 stroke-gray-950"
          >
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaTooltip>
  );
}

export interface TooltipTriggerProps extends AriaTooltipTriggerComponentProps {}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  return <AriaTooltipTrigger delay={500} {...props} />;
};
