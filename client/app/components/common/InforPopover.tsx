// File path: src/components/AuthPopover.js
import { Popover, Transition, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "@remix-run/react";

export default function InfoPopover() {
    return (
        <div className="max-w-sm">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <PopoverButton
                            className={`${open
                                ? "text-text bg-gradient-to-l from-accent to-complementary outline-none"
                                : "text-text bg-gradient-to-br from-complementary to-accent hover:bg-gradient-to-r hover:from-accent hover:to-complementary outline-none"
                                } text-sm px-4 h-14 whitespace-nowrap inline-flex gap-2 items-center justify-center`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M18 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M6 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4M6 7v10m12 0V7s0-2-2-2h-3" /><path d="M15 7.5L12.5 5L15 2.5" /></g></svg>
                            <span>Contribution</span>
                            {/* Inline SVG for Chevron Down Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2em"
                                height="2em"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""
                                    }`}
                            >
                                <path d="M7 10l5 5 5-5z" />
                            </svg>
                        </PopoverButton>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="absolute left-1/2 z-10 w-80 -translate-x-3/4 transform sm:px-0 lg:max-w-3xl flex flex-col gap-2 p-2">
                                <div className=" drop-shadow-2xl drop-shadow-black ring-1 ring-secondary bg-primary   flex flex-col divide-y divide-secondary overflow-hidden">
                                    <div className="relative flex flex-col gap-4  justify-center items-center bg-primary h-64 p-8">
                                        <p className="text-2xl  font-medium">Contribution</p>
                                        <p className="text-xs text-text2">
                                            Contribute to ExpertForms by fixing bugs, adding features, improving documentation, writing tests, creating tools, sharing examples, or suggesting design improvements.  For significant changes, please open an issue first.
                                        </p>


                                        <a
                                            href="https://github.com/mosesimbahale0/ExpertForms"
                                            target="_blank"
                                            className="bg-secondary hover:bg-accent  hover:text-text  text-text2 rounded-full flex  flex-row items-center justify-center   p-3 text-sm "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M10 20.568c-3.429 1.157-6.286 0-8-3.568" /><path d="M10 22v-3.242c0-.598.184-1.118.48-1.588c.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2c.166-.236.25-.354.27-.46c.02-.108-.015-.247-.085-.527c-.283-1.136-.264-2.343.16-3.43c0 0 .877-.287 2.874.96c.456.285.684.428.885.46s.469-.035 1.005-.169A9.5 9.5 0 0 1 13.5 3a9.6 9.6 0 0 1 2.343.28c.536.134.805.2 1.006.169c.2-.032.428-.175.884-.46c1.997-1.247 2.874-.96 2.874-.96c.424 1.087.443 2.294.16 3.43c-.07.28-.104.42-.084.526s.103.225.269.461c.668.95 1.048 2.04 1.048 3.2c0 4.462-2.134 5.807-5.177 6.643c-.367.101-.507.559-.303.88c.296.47.48.99.48 1.589V22" /></g></svg>

                                        </a>


                                    </div>

                                    {/* Legal Links Section */}
                                    <div className="bg-primary p-4">
                                        <div className="flex flex-col gap-4 px-2 py-2">
                                            <span className="text-sm font-medium text-text">

                                                <p className="">

                                                <a href="https://github.com/mosesimbahale0/ExpertForms/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">License</a>
                                                <br />
                                                <a href="https://github.com/mosesimbahale0/ExpertForms/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Readme</a>
                                                <br />

                                                </p>

                                                <a href="https://1drv.ms/w/c/cc19bae930a8cf43/EVcmwWpJUPpLth40f5enth8BCkXSC6kpnpWmWDdHvZ3VWQ" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">White Paper</a>

                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
