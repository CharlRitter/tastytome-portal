import React from 'react';
import {
  FaBook,
  FaBox,
  FaCog,
  FaInfoCircle,
  FaRegEnvelope,
  FaRegFileAlt,
  FaRegUser,
  FaShoppingBasket
} from 'react-icons/fa';

import { InfoModals, Page } from '@/types/constants';

export const PAGES: Page[] = [
  {
    title: 'Recipes',
    route: '/recipes',
    icon: <FaBook />
  },
  {
    title: 'Pantry',
    route: '/pantry',
    icon: <FaBox />
  },
  {
    title: 'Shopping List',
    route: '/shopping-list',
    icon: <FaShoppingBasket />
  },
  {
    title: 'Account',
    route: '/account',
    icon: <FaRegUser />
  },
  {
    title: 'Settings',
    route: '/settings',
    icon: <FaCog />
  },
  {
    title: 'Contact',
    route: '/contact',
    icon: <FaRegEnvelope />
  }
];

export const INFO_MODALS: InfoModals = {
  unsetModal: 0,
  modals: [
    {
      id: 1,
      title: 'About',
      icon: <FaInfoCircle />
    },
    {
      id: 2,
      title: 'Terms',
      icon: <FaRegFileAlt />
    }
  ]
};
