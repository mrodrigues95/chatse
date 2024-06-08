import { type ComponentProps } from 'react';
import { createLink } from '@tanstack/react-router';

import { Link as ToolkitLink } from '@chatse/toolkit';

export const Link = createLink(ToolkitLink);

export type LinkProps = ComponentProps<typeof Link>;
