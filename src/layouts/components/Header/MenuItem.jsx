import React from 'react';
import { MenuItem as MenuIt } from '@headlessui/react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const MenuItem = ({ item }) => {
   return (
      <MenuIt>
         {({ active }) => (
            console.log('hello im emu oto'),
            (
               <Link
                  className={classNames(
                     active && 'bg-skin-primary-inverted text-skin-primary',
                     'mt-1 flex cursor-pointer items-center rounded-lg px-4 py-4 font-semibold text-skin'
                  )}
                  to={item.path}
               >
                  <div className="me-5 text-lg font-semibold">{item.icon}</div>
                  <span>{item.label}</span>
               </Link>
            )
         )}
      </MenuIt>
   );
};

export default MenuItem;
