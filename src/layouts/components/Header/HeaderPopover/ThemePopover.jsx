import { VscColorMode } from 'react-icons/vsc';
import classNames from 'classnames';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { MdOutlineWbSunny } from 'react-icons/md';
import { LuMoonStar } from 'react-icons/lu';
import { useContext, Fragment } from 'react';
import { ThemeContext } from '~/store/context';
import { MODES, THEMES } from '~/store/constants';
import Tooltip from '@mui/material/Tooltip';
import { HiOutlineCheck } from 'react-icons/hi';

const ThemePopover = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <Popover className="relative rounded-lg bg-slate-400">
            {({ open }) => (
                <div>
                    <PopoverButton
                        className={classNames(
                            open ? 'bg-skin-secondary text-skin-secondary-inverted' : 'bg-skin-secondary-inverted text-skin-secondary',
                            'inline-flex items-center rounded-lg p-2 text-xl font-bold hover:bg-skin-secondary hover:text-skin-secondary-inverted focus:outline-none'
                        )}
                    >
                        <VscColorMode />
                    </PopoverButton>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <PopoverPanel className="absolute right-0 z-10 mt-2.5 w-[375px] text-skin">
                            <div className="flex flex-col rounded-lg bg-skin-base shadow-[0_8px_10px_-5px_rgba(0,0,0,0.2),0_16px_24px_2px_rgba(0,0,0,0.14),0_6px_30px_5px_rgba(0,0,0,0.12)]">
                                <div className="flex w-full items-center justify-between border-b-[1.5px] border-skin p-4">
                                    <span className="text-sm font-semibold">THEME MODE</span>
                                    <div className="flex items-center">
                                        <Tooltip title="light">
                                            <button
                                                key={'light'}
                                                onClick={() => setTheme({ ...theme, mode: 'light' })}
                                                className={classNames(
                                                    'light' === theme.mode ? 'border-skin-secondary' : 'border-skin-utility-dark',
                                                    'me-3 flex h-12 w-12 items-center justify-center rounded-[4px] border-2 text-skin-warning'
                                                )}
                                            >
                                                <MdOutlineWbSunny className="text-2xl" />
                                            </button>
                                        </Tooltip>

                                        <Tooltip title="dark">
                                            <button
                                                key={'dark'}
                                                onClick={() => setTheme({ ...theme, mode: 'dark' })}
                                                className={classNames(
                                                    'dark' === theme.mode ? 'border-skin-secondary' : 'border-skin-utility-dark',
                                                    'flex h-12 w-12 items-center justify-center rounded-[4px] border-2 bg-skin-utility-dark text-skin-base'
                                                )}
                                            >
                                                <LuMoonStar className="text-2xl" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>

                                <div className="pt-5">
                                    <div className="px-4 pb-4">
                                        <div className="text-sm font-semibold">PRESENT COLOR</div>
                                        <div className="mt-2 flex w-full flex-wrap">
                                            {THEMES.map((item) => (
                                                <div className="h-fit w-fit ps-3 pt-3" key={item}>
                                                    <Tooltip title={item}>
                                                        <button
                                                            className={`flex h-12 w-12 items-center justify-center rounded-full opacity-90 ${theme.mode} ${item}`}
                                                            style={{
                                                                background: `linear-gradient(135deg, var(--color-primary) 50%, var(--color-secondary) 50%)`,
                                                            }}
                                                            onClick={() =>
                                                                setTheme({
                                                                    ...theme,
                                                                    theme: item,
                                                                })
                                                            }
                                                        >
                                                            {theme.theme === item && <HiOutlineCheck className="z-10 text-3xl text-skin-base" />}
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </div>
            )}
        </Popover>
    );
};

export default ThemePopover;
