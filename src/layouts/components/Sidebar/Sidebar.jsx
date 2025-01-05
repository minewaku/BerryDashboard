import React from 'react';
import { SIDEBAR_ITEMS } from '~/store/constants';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { memo } from "react"

const Sidebar = () => {
   console.log('Sidebar rendered');

   return (
      <div className="scrollbar h-full w-1/6 bg-skin-base">
         <div className="flex flex-col px-4">
            {SIDEBAR_ITEMS.map((item) => (
               <SidebarGroup key={item.group} item={item} />
            ))}
         </div>
      </div>
   );
};

const SidebarGroup = ({ item }) => {
   return (
      <div className="flex flex-col">
         <div className="align-left mb-3 mt-2 p-1 font-semibold text-skin">{item.group}</div>

         {item.children.map((item) => (
            <SidebarLink key={item.key} item={item} />
         ))}

         <div className="my-0.5 border-t border-skin"></div>
      </div>
   );
};

const SidebarLink = ({ item }) => {
   const { pathname } = useLocation();

   return (
      <Link
         to={item.path}
         className={classNames(
            item.path === pathname ? 'bg-skin-primary-inverted text-skin-primary' : '',
            'mb-1 flex grow items-center justify-start rounded-lg px-4 py-2.5 pe-4 ps-6 text-left font-medium text-skin transition duration-100 ease-out hover:cursor-pointer hover:bg-skin-primary-inverted hover:text-skin-primary hover:ease-in'
         )}
      >
         <div className="flex min-w-8 items-center text-lg">{item.icon}</div>
         <div className="my-1 flex items-center overflow-hidden">
            <h5 className="line overflow-hidden text-ellipsis whitespace-nowrap">{item.label}</h5>
         </div>
      </Link>
   );
};

export default memo(Sidebar);
