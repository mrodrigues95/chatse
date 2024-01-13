import dynamic from 'next/dynamic';
import { cva, type VariantProps } from 'class-variance-authority';
import type { icons, LucideProps } from 'lucide-react';

import { AccessibleIcon, cn, type AccessibleIconProps } from '@chatse/toolkit';

const iconVariants = cva('', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export interface IconProps
  extends Omit<LucideProps, 'size' | 'aria-label' | 'aria-labelledby'>,
    VariantProps<typeof iconVariants>,
    Pick<AccessibleIconProps, 'title'> {
  name: keyof typeof icons;
}

export const Icon = ({ name, size, className, title, ...props }: IconProps) => {
  const LucideIcon = dynamic(() => import('lucide-react').then(mod => mod[name]));

  return (
    <AccessibleIcon title={title}>
      <LucideIcon className={cn(iconVariants({ size, className }))} {...props} />
    </AccessibleIcon>
  );
};
