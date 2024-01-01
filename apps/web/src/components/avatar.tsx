'use client';

import { useEffect, useState, type ComponentProps } from 'react';
import Image, { type ImageProps } from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@chatse/toolkit';
import { Icon } from './icon';

export const avatarVariants = cva(
  'relative inline-flex min-w-0 shrink-0 items-center justify-center overflow-hidden border-transparent text-center font-semibold uppercase',
  {
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
        xs: 'h-4 w-4 text-[0.4rem]',
        sm: 'h-6 w-6 text-[0.6rem]',
        md: 'h-8 w-8 text-[0.8rem]',
        lg: 'h-12 w-12 text-[1.2rem]',
        xl: 'h-16 w-16 text-[1.6rem]',
        xxl: 'h-24 w-24 text-[2.4rem]',
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
  },
);

interface BaseAvatarProps {
  name?: string;
}

const AvatarPlaceholderIcon = () => {
  return <Icon name="User" />;
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
  imageProps?: ImageProps;
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
    <Image
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...imageProps}
      src={imageProps.src}
      alt={imageProps.alt}
      onError={e => {
        imageProps.onError?.(e);
        setError(true);
      }}
      className={cn('object-cover', imageProps.className)}
    />
  ) : null;

  return (
    <span className={cn(avatarVariants({ scheme, size, radius, className }))} {...props}>
      {error ? ErrorFallbackComponent : ImageComponent}
    </span>
  );
};
