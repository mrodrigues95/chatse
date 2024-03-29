import { type ReactNode } from 'react';
import { ToastQueue } from '@react-stately/toast';
import type { Meta, StoryObj } from '@storybook/react';
import { X } from 'lucide-react';

import { cn } from '../../utils/cn';
import { Button } from '../button/button';
import { Toast, ToastProvider, ToastRegion } from './toast';

const meta = {
  component: Toast,
  title: 'Toast',
  tags: ['autodocs'],
  parameters: { controls: { include: [] } },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

interface MyToast {
  title: string;
  description?: string;
  action?: ReactNode;
}

const queue = new ToastQueue<MyToast>({ maxVisibleToasts: 5, hasExitAnimation: true });

const Toaster = () => (
  <ToastProvider queue={queue}>
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
            {({ titleProps, descriptionProps, closeButtonProps }) => (
              <>
                <div className="grid gap-1">
                  <Toast.Title {...titleProps}>{toast.content.title}</Toast.Title>
                  <Toast.Description {...descriptionProps}>
                    {toast.content.description}
                  </Toast.Description>
                </div>
                {toast.content.action}
                <Toast.Close {...closeButtonProps} aria-label="Close">
                  <X />
                </Toast.Close>
              </>
            )}
          </Toast>
        ))}
      </ToastRegion>
    )}
  </ToastProvider>
);

export const Simple: Story = {
  render: () => (
    <>
      <Toaster />
      <Button onPress={() => queue.add({ title: 'Your message has been sent.' })}>
        Show Toast
      </Button>
    </>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        onPress={() =>
          queue.add({
            title: 'Uh-oh! Something went wrong.',
            description: 'There was a problem with your request.',
          })
        }
      >
        Show Toast
      </Button>
    </>
  ),
};

export const WithAction: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        onPress={() =>
          queue.add({
            title: 'Uh-oh! Something went wrong.',
            description: 'There was a problem with your request.',
            action: (
              <Button className="mr-6" size="xs" variant="outline">
                Try again
              </Button>
            ),
          })
        }
      >
        Show Toast
      </Button>
    </>
  ),
};
