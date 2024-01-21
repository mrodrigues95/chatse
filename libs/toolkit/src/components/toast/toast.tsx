'use client';

import { useRef, type ComponentProps, type ReactNode } from 'react';
import {
  useToast,
  useToastRegion,
  type AriaToastProps,
  type AriaToastRegionProps,
  type ToastAria,
} from '@react-aria/toast';
import { useToastQueue, type ToastQueue, type ToastState } from '@react-stately/toast';
import { createPortal } from 'react-dom';

import { cn } from '../../utils/cn';
import { IconButton, type IconButtonProps } from '../icon-button/icon-button';

export interface ToastRegionProps<T> extends AriaToastRegionProps, ComponentProps<'ul'> {
  state: ToastState<T>;
}

export const ToastRegion = <T,>({ state, className, ...props }: ToastRegionProps<T>) => {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <ol
      {...regionProps}
      {...props}
      ref={ref}
      className={cn(
        'fixed bottom-0 right-0 flex w-full flex-col gap-2 p-4 outline-none sm:max-w-md',
        className,
      )}
    />
  );
};

export interface ToastCloseButtonProps extends IconButtonProps {}

const ToastCloseButton = ({
  className,
  size = 'sm',
  variant = 'ghost',
  ...props
}: ToastCloseButtonProps) => (
  <IconButton
    size={size}
    variant={variant}
    className={cn(
      'absolute right-2 top-2 rounded-md p-0 opacity-0 transition-opacity',
      'focus:opacity-100 group-hover:opacity-100',
      className,
    )}
    {...props}
  />
);

export interface ToastTitleProps extends ComponentProps<'div'> {}

const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <div className={cn('text-sm font-semibold text-slate-900', className)} {...props} />
);

export interface ToastDescriptionProps extends ComponentProps<'div'> {}

const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => (
  <div className={cn('text-sm font-medium text-slate-500', className)} {...props} />
);

export interface ToastProps<T> extends AriaToastProps<T>, Omit<ComponentProps<'li'>, 'children'> {
  state: ToastState<T>;
  children: (props: Omit<ToastAria, 'toastProps'>) => ReactNode;
}

export const Toast = <T,>({ state, children, className, ...props }: ToastProps<T>) => {
  const ref = useRef(null);
  const { toastProps, titleProps, descriptionProps, closeButtonProps } = useToast(
    props,
    state,
    ref,
  );

  const { toast, ...rest } = props;

  return (
    <li
      {...toastProps}
      {...rest}
      ref={ref}
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border border-slate-300 bg-white p-4 shadow-md',
        className,
      )}
    >
      {children({ titleProps, descriptionProps, closeButtonProps })}
    </li>
  );
};

Toast.Close = ToastCloseButton;
Toast.Title = ToastTitle;
Toast.Description = ToastDescription;

export interface ToasterProps<T> {
  queue: ToastQueue<T>;
  children: (state: ToastState<T>) => ReactNode;
}

export const ToastProvider = <T,>({ queue, children }: ToasterProps<T>) => {
  const state = useToastQueue(queue);
  return state.visibleToasts.length > 0 ? createPortal(children(state), document.body) : null;
};
