'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

import { AccessibleIcon } from '../accessible-icon/accessible-icon';
import { AlertContent } from './alert-content';
import { AlertTitle } from './alert-title';

export const alertVariants = tv({
  slots: {
    base: 'relative flex items-center space-x-3 rounded-lg p-4',
    title: 'font-semibold',
    content: '',
  },
  variants: {
    variant: {
      info: { base: 'bg-sky-50', title: 'text-sky-800', content: 'text-sky-700' },
      warning: { base: 'bg-amber-50', title: 'text-amber-800', content: 'text-amber-700' },
      success: { base: 'bg-emerald-50', title: 'text-emerald-800', content: 'text-emerald-700' },
      error: { base: 'bg-red-50', title: 'text-red-800', content: 'text-red-700' },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const ICONS = {
  info: { component: <Info className="text-sky-400" />, label: 'Information' },
  success: { component: <CheckCircle2 className="text-emerald-400" />, label: 'Success' },
  error: { component: <XCircle className="text-red-400" />, label: 'Error' },
  warning: { component: <AlertTriangle className="text-amber-400" />, label: 'Warning' },
} as const;

export interface AlertProps extends ComponentProps<'div'>, VariantProps<typeof alertVariants> {}

export const Alert = ({
  variant = 'info',
  className,
  children,
  autoFocus,
  ...props
}: AlertProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const autoFocusRef = useRef(autoFocus);

  useEffect(() => {
    if (autoFocusRef.current && divRef.current) {
      divRef.current.focus();
    }
    autoFocusRef.current = false;
  }, [autoFocus]);

  const icon = variant && ICONS[variant];
  const { base } = alertVariants({ variant, className });

  return (
    <AlertProvider variant={variant}>
      <div
        {...props}
        tabIndex={autoFocus ? -1 : undefined}
        autoFocus={autoFocus}
        role="alert"
        className={base()}
        ref={divRef}
      >
        <span className="self-baseline">
          {icon && <AccessibleIcon title={icon.label}>{icon.component}</AccessibleIcon>}
        </span>
        <div className="flex-1 space-y-1 break-words">{children}</div>
      </div>
    </AlertProvider>
  );
};

Alert.Title = AlertTitle;
Alert.Content = AlertContent;

interface AlertContext extends Pick<AlertProps, 'variant'> {}

const AlertContext = createContext<AlertContext | null>(null);

export const AlertProvider = ({ variant, children }: AlertContext & { children: ReactNode }) => {
  const context = useMemo(() => ({ variant }), [variant]);
  return <AlertContext.Provider value={context}>{children}</AlertContext.Provider>;
};

export const useAlert = () => useContext(AlertContext);
