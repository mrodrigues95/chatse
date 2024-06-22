import { useRef, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import {
  ChevronRight,
  Eye,
  Filter,
  Glasses,
  Globe,
  GlobeLock,
  KeyRound,
  Handshake,
  Laptop,
  MapPin,
  Search,
  Tag,
  Users,
} from 'lucide-react';

import {
  Button,
  IconButton,
  Input,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  Text,
  type Selection,
} from '@chatse/toolkit';
import { Icon } from '../../../../components';

const SubmenuIcon = (
  <Icon size="xs">
    <ChevronRight />
  </Icon>
);

const FilterDropdown = () => {
  return (
    <MenuTrigger>
      <IconButton aria-label="Filter clubs" variant="ghost">
        <Filter />
      </IconButton>
      <Menu placement="bottom right">
        {/* @ts-ignore: React19 not fully supported yet by RAC. */}
        <SubmenuTrigger>
          <MenuItem id="location" textValue="Locations" submenuIcon={SubmenuIcon}>
            <Icon className="text-slate-500">
              <MapPin />
            </Icon>
            Locations
          </MenuItem>
          <Popover>
            <Menu onAction={key => console.log(key)}>
              <MenuItem id="online">
                <Icon className="text-slate-500">
                  <Laptop />
                </Icon>
                Online
              </MenuItem>
              <MenuItem id="meetup">
                <Icon className="text-slate-500">
                  <Handshake />
                </Icon>
                Meetup
              </MenuItem>
            </Menu>
          </Popover>
        </SubmenuTrigger>
        <SubmenuTrigger>
          <MenuItem id="tags" textValue="Visibility" submenuIcon={SubmenuIcon}>
            <Icon className="text-slate-500">
              <Glasses />
            </Icon>
            Visibility
          </MenuItem>
          <Popover>
            <Menu onAction={key => console.log(key)}>
              <MenuItem id="public">
                <Icon className="text-slate-500">
                  <Globe />
                </Icon>
                Public
              </MenuItem>
              <MenuItem id="private">
                <Icon className="text-slate-500">
                  <GlobeLock />
                </Icon>
                Private
              </MenuItem>
            </Menu>
          </Popover>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  );
};

export const ActionBar = () => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const transitions = useTransition(showSearch, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 50 },
    exitBeforeEnter: true,
  });

  return (
    <div className="flex h-8 items-center justify-end gap-1">
      {transitions((style, showSearch) => (
        <animated.div style={style} className="inline-flex items-center">
          {showSearch ? (
            <Input
              type="search"
              aria-label="Search for clubs"
              onBlur={() => {
                if (!search) {
                  setShowSearch(false);
                }
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              density="compact"
              className="w-64"
              autoFocus
            />
          ) : (
            <IconButton
              aria-label="Search for clubs, open prompt"
              onPress={() => setShowSearch(true)}
              variant="ghost"
            >
              <Search />
            </IconButton>
          )}
        </animated.div>
      ))}
      <FilterDropdown />
    </div>
  );
};
