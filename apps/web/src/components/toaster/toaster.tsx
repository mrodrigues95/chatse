'use client';

import { useMemo, type ReactNode } from 'react';
import { ToastQueue } from '@react-stately/toast';
import { X } from 'lucide-react';

import { cn, Toast, ToastProvider, ToastRegion } from '@chatse/toolkit';

type TToastQueue =
  | {
      title: string;
      description?: string;
      action?: ReactNode;
      variant?: 'info' | 'error';
    }
  | {
      title?: string;
      description?: string;
      action?: ReactNode;
      variant: 'error';
    };

const toastQueue = new ToastQueue<TToastQueue>({ maxVisibleToasts: 5 });

export const useToast = () => useMemo(() => ({ toast: toastQueue }), []);

const getGenericErrorFallbackLanguage = ({
  content,
}: (typeof toastQueue)['visibleToasts'][number]) =>
  content.variant === 'error'
    ? {
        title: content.title || 'Uh-oh! Something went wrong.',
        description:
          content.description || 'There was a problem with your request. Please try again.',
      }
    : content;

export const Toaster = () => (
  <ToastProvider queue={toastQueue}>
    {state => (
      <ToastRegion state={state}>
        {state.visibleToasts.map(toast => (
          <Toast
            key={toast.key}
            toast={toast}
            state={state}
            data-animation={toast.animation}
            onAnimationEnd={() => {
              if (toast.animation === 'exiting') {
                state.remove(toast.key);
              }
            }}
            className={cn(
              'data-[animation=entering]:animate-in data-[animation=entering]:slide-in-from-top-full data-[animation=entering]:sm:slide-in-from-bottom-full',
              'data-[animation=exiting]:animate-out data-[animation=exiting]:fade-out-80 data-[animation=exiting]:slide-out-to-right-full',
            )}
          >
            {({ titleProps, descriptionProps, closeButtonProps }) => {
              const { title, description } = getGenericErrorFallbackLanguage(toast);

              return (
                <>
                  <div className="grid gap-1">
                    <Toast.Title {...titleProps}>{title}</Toast.Title>
                    <Toast.Description {...descriptionProps}>{description}</Toast.Description>
                  </div>
                  {toast.content.action}
                  <Toast.Close {...closeButtonProps} aria-label="Close">
                    <X size={16} />
                  </Toast.Close>
                </>
              );
            }}
          </Toast>
        ))}
      </ToastRegion>
    )}
  </ToastProvider>
);
