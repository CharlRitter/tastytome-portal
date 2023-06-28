import React from 'react';
import {
  FaRegUser,
  FaRegEnvelope,
  FaRegFileAlt,
  FaInfoCircle,
  FaCog,
  FaBook,
  FaShoppingBasket,
  FaBox,
  FaHome,
  FaRegFile,
  FaCloud
} from 'react-icons/fa';
import { InfoModals, Page } from '@/constants/types';

export const PAGES: Page[] = [
  {
    title: 'Dashboard',
    route: '/',
    icon: <FaHome />
  },
  {
    title: 'Recipes',
    route: '/recipes',
    icon: <FaBook />
  },
  {
    title: 'Library',
    route: '/library',
    icon: <FaCloud />
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
      title: 'Changelog',
      icon: <FaRegFile />
    },
    {
      id: 3,
      title: 'Terms',
      icon: <FaRegFileAlt />
    }
  ]
};
