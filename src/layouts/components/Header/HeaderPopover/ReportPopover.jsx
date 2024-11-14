import { GoBug } from "react-icons/go"
import classNames from "classnames"
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react"
import { useState, Fragment } from "react"

const ReportPopover = () => {
    return (
        <Popover className="relative rounded-lg bg-slate-400">
            {({ open }) => (
                <div>
                    <PopoverButton
                        className={classNames(
                            open
                                ? "bg-primary text-primary_bg"
                                : "bg-primary_bg text-primary",
                            "inline-flex items-center rounded-lg p-2 text-xl font-bold hover:bg-primary hover:text-primary_bg focus:outline-none",
                        )}
                    >
                        <GoBug />
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
                        <PopoverPanel className="absolute right-0 z-10 mt-2.5 w-[330px]">
                            <div className="flex flex-col rounded-lg bg-white shadow-[0_8px_10px_-5px_rgba(0,0,0,0.2),0_16px_24px_2px_rgba(0,0,0,0.14),0_6px_30px_5px_rgba(0,0,0,0.12)]">
                                <div className="border-border flex items-center border-b-[1.5px] px-4 py-5">
                                    <h3 className="me-3 font-bold">
                                        Notification
                                    </h3>
                                    <span className="rounded-2xl bg-yellow-400 px-3 py-1 text-xs font-semibold text-white">
                                        12
                                    </span>
                                </div>

                                <div className="flex flex-col"></div>

                                <div className="flex items-center justify-center p-4 font-semibold text-blue-500">
                                    <button>View all</button>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </div>
            )}
        </Popover>
    )
}

export default ReportPopover
