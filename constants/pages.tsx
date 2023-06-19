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
  FaHome
} from 'react-icons/fa';

export default [
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
    icon: <FaCog />,
    divider: true
  },
  {
    title: 'About',
    route: '/about',
    icon: <FaInfoCircle />
  },
  {
    title: 'Contact',
    route: '/contact',
    icon: <FaRegEnvelope />
  },
  {
    title: 'Terms',
    route: '/terms',
    icon: <FaRegFileAlt />
  }
];
