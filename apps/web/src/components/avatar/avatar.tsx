import { useEffect, useState, type ComponentProps } from 'react';
import { LucideUser } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@chatse/toolkit';
import { Icon } from '../icon/icon';

export const avatarVariants = tv({
  base: 'relative inline-flex min-w-0 shrink-0 items-center justify-center overflow-hidden border-transparent text-center font-semibold uppercase',
  variants: {
    scheme: {
      sky: 'bg-sky-100 text-sky-600',
      pink: 'bg-pink-100 text-pink-600',
      green: 'bg-emerald-100 text-emerald-600',
      purple: 'bg-violet-100 text-violet-600',
      rose: 'bg-rose-100 text-rose-600',
      gray: 'bg-gray-100 text-gray-600',
      orange: 'bg-orange-100 text-orange-600',
    },
    size: {
      xs: 'size-4 text-[0.4rem]',
      sm: 'size-6 text-[0.6rem]',
      md: 'size-8 text-[0.8rem]',
      lg: 'size-12 text-[1.2rem]',
      xl: 'size-16 text-[1.6rem]',
      xxl: 'size-24 text-[2.4rem]',
    },
    radius: {
      none: 'rounded-none',
      md: 'rounded-md',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    scheme: 'sky',
    size: 'sm',
    radius: 'md',
  },
});

interface BaseAvatarProps {
  name?: string;
}

const AvatarPlaceholderIcon = () => {
  return (
    <Icon>
      <LucideUser />
    </Icon>
  );
};

const getInitials = (name: string) => {
  const initials = name.split(' ').map(n => n[0]);
  return initials.join('');
};

interface AvatarNameProps extends ComponentProps<'div'>, BaseAvatarProps {}

const AvatarName = ({ name, ...props }: AvatarNameProps) =>
  name ? (
    <div role="img" aria-label={name} {...props}>
      {getInitials(name)}
    </div>
  ) : null;

export interface AvatarProps
  extends BaseAvatarProps,
    VariantProps<typeof avatarVariants>,
    ComponentProps<'span'> {
  imageProps?: ComponentProps<'img'>;
}

export const Avatar = ({
  name,
  className,
  radius,
  scheme,
  size,
  imageProps,
  ...props
}: AvatarProps) => {
  const [error, setError] = useState(!imageProps?.src);

  useEffect(() => {
    imageProps?.src ? setError(false) : setError(true);
  }, [imageProps?.src]);

  const ErrorFallbackComponent = name ? <AvatarName name={name} /> : <AvatarPlaceholderIcon />;

  const ImageComponent = imageProps ? (
    <img
      // fill
      // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...imageProps}
      src={imageProps.src}
      alt={imageProps.alt}
      onError={e => {
        imageProps.onError?.(e);
        setError(true);
      }}
      className={cn('inline-block h-full w-full', imageProps.className)}
    />
  ) : null;

  return (
    <span className={avatarVariants({ scheme, size, radius, className })} {...props}>
      {error ? ErrorFallbackComponent : ImageComponent}
    </span>
  );
};
