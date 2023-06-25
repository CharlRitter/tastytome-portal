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
  FaRegFile
} from 'react-icons/fa';
import About from '@/public/files/about.mdx';
import Changelog from '@/public/files/changelog.mdx';
import Terms from '@/public/files/terms.mdx';
import { InfoModal, Page } from '@/constants/types';

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

export const INFO_MODALS: InfoModal[] = [
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
];
