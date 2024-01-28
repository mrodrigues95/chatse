'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { LucideChevronRight, LucideHome } from 'lucide-react';
import {
  useBreadcrumbItem,
  useBreadcrumbs,
  type AriaBreadcrumbItemProps,
  type AriaBreadcrumbsProps,
} from 'react-aria';

import { cn } from '@chatse/toolkit';
import { Link, type LinkProps } from '../link/link';

type BreadcrumbProps = AriaBreadcrumbItemProps & {
  href?: LinkProps['href'];
  separator?: ReactNode;
};

const Breadcrumb = ({ href, separator, ...props }: BreadcrumbProps) => {
  const ref = useRef(null);
  const { itemProps } = useBreadcrumbItem({ ...props, elementType: href ? 'a' : 'span' }, ref);

  const Component = href ? Link : 'span';

  return (
    <li className="flex items-center gap-1">
      <Component
        {...itemProps}
        href={href!}
        ref={ref}
        className={cn(
          'p-0 text-base font-semibold no-underline',
          'hover:no-underline',
          props.isCurrent ? 'text-blue-700' : 'text-slate-500',
          props.isCurrent || props.isDisabled ? 'cursor-default' : 'cursor-pointer',
          !props.isDisabled &&
            !props.isCurrent &&
            'hover:text-slate-900 focus-visible:text-slate-900',
          itemProps.className,
        )}
      >
        {props.children}
      </Component>
      {!props.isCurrent && (separator ?? <LucideChevronRight className="h-4 w-4 text-slate-500" />)}
    </li>
  );
};

interface BreadcrumbsProps extends AriaBreadcrumbsProps, ComponentProps<'nav'> {}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { navProps } = useBreadcrumbs(props);
  const childCount = Children.count(props.children);

  return (
    <nav {...navProps} {...props}>
      <ol className="flex items-center gap-1">
        {Children.map(props.children, (child, i) => {
          if (isValidElement(child)) {
            return cloneElement<BreadcrumbProps>(child as ReactElement, {
              isCurrent: i === childCount - 1,
            });
          }

          return null;
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.Breadcrumb = Breadcrumb;

export const BreadCrumbsForPath = (props: Omit<BreadcrumbsProps, 'children'>) => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);

  return (
    <Breadcrumbs {...props}>
      <Breadcrumb isDisabled>
        <LucideHome className="h-4 w-4" />
      </Breadcrumb>
      {paths.map((path, idx) => {
        const href = `/${paths.slice(0, idx + 1).join('/')}`;
        const isLastCrumb = idx === paths.length - 1;
        return (
          <Breadcrumb key={path} href={isLastCrumb ? undefined : href}>
            {path[0].toUpperCase() + path.slice(1)}
          </Breadcrumb>
        );
      })}
    </Breadcrumbs>
  );
};
