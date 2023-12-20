import dynamic from 'next/dynamic';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

import { AccessibleIcon, cn } from '@chatse/toolkit';
import type { AccessibleIconProps } from '@chatse/toolkit';

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
  extends Omit<LucideProps, 'size'>,
    VariantProps<typeof iconVariants>,
    Pick<AccessibleIconProps, 'label'> {
  name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, size, className, label, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return (
    <AccessibleIcon label={label}>
      <LucideIcon className={cn(iconVariants({ size, className }))} {...props} />
    </AccessibleIcon>
  );
};
