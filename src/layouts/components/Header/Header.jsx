import React, { Fragment } from 'react';
import { memo } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { Transition } from '@headlessui/react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { FaDashcube } from 'react-icons/fa6';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '~/store/redux/store';
import { IMAGE_4 } from '~/assets';
import { HEADER_ITEMS } from '~/store/constants';
import { HEADER_MENU_ITEMS } from '~/store/constants';
import MenuItem from './MenuItem';

const Header = () => {
   console.log('Header rendered');
   const user = store.getState().auth.account;

   return (
      <div className="flex flex-none items-center bg-skin-base p-4 pe-6 ps-6">
         <div className="w-1/6">
            <Link to="/" className="flex min-h-12 flex-row items-center text-xl w-fit outline-none">
               <FaDashcube className="text-skin-secondary" />
               <span className="ms-2 font-bold text-skin-utility-logo">ADMIN</span>
            </Link>
         </div>

         <div className="flex flex-grow justify-between">
            <div className="border-skin-disabled bg-skin-search flex items-center rounded-md border px-4 focus-within:border-transparent focus-within:shadow-inner-focus">
               <HiOutlineSearch className="text-skin-utility-icon-search text-base font-thin" />
               <input type="text" placeholder="Search..." className="text-skin-utility-text-search min-w-[434px] bg-transparent px-3.5 py-4 text-sm font-semibold focus:outline-none placeholder:text-skin-utility-text-search" />
            </div>

            <div className="flex items-center gap-4">
               {HEADER_ITEMS.map((Item, index) => (
                  <Item key={index} />
               ))}

               <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="inline-flex rounded-full">
                     {({ active }) => (
                        <div className="">
                           <span className="sr-only">Open user menu</span>
                           <div
                              className={classNames(
                                 active && 'shadow-inner-focus',
                                 'h-10 w-10 rounded-full bg-skin-secondary bg-cover bg-center bg-no-repeat'
                              )}
                              style={{
                                 backgroundImage: `url(${user.imageUrl || IMAGE_4})`,
                              }}
                           >
                              <span className="sr-only">Minewaku</span>
                           </div>
                        </div>
                     )}
                  </MenuButton>

                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                     leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95"
                  >
                     <MenuItems className="absolute right-0 z-10 mt-2 w-[330px] origin-top-right rounded-lg bg-skin-base p-4 shadow-[0_8px_10px_-5px_rgba(0,0,0,0.2),0_16px_24px_2px_rgba(0,0,0,0.14),0_6px_30px_5px_rgba(0,0,0,0.12)] focus:outline-none">
                        {HEADER_MENU_ITEMS.map((item) => (
                           <MenuItem key={item.key} item={item} />
                        ))}
                     </MenuItems>
                  </Transition>
               </Menu>
            </div>
         </div>
      </div>
   );
}

export default memo(Header);