import { HiOutlineViewGrid, HiOutlineQuestionMarkCircle, HiOutlineCog } from 'react-icons/hi';

import { MdOutlineArticle } from 'react-icons/md';
import { NotificationPopover, ReportPopover, ThemePopover, LanguagePopover } from '~/layouts/components/Header/HeaderPopover';
import { GoGear } from 'react-icons/go';
import { RiUser3Line } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';
import { MdOutlineTableRows } from "react-icons/md";

export const HEADER_ITEMS = [LanguagePopover, NotificationPopover, ThemePopover, ReportPopover];

export const HEADER_MENU_ITEMS = [
   {
      key: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <GoGear />,
   },
   {
      key: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: <RiUser3Line />,
   },
   {
      key: 'logout',
      label: 'Logout',
      path: '/logout',
      icon: <IoIosLogOut />,
   },
];

export const SIDEBAR_ITEMS = [
   {
      group: 'Dashboard',
      children: [
         {
            key: 'dashboard',
            label: 'Dashboard',
            path: '/',
            icon: <HiOutlineViewGrid />,
         },
         {
            key: 'table',
            label: 'Table',
            path: '/table',
            icon: <MdOutlineTableRows />,
         },
      ],
   },
   {
      group: 'Application',
      children: [
         {
            key: 'support',
            label: 'Help & Support',
            path: '/support',
            icon: <HiOutlineQuestionMarkCircle />,
         },
         {
            key: 'settings',
            label: 'Settings',
            path: '/settings',
            icon: <HiOutlineCog />,
         },
      ],
   },
   {
      group: 'Others',
      children: [],
   },
];
