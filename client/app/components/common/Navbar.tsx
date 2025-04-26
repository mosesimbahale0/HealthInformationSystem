// File path: src/components/Navbar.js
import { Link, NavLink } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { Popover, Transition, PopoverButton, PopoverPanel, PopoverGroup } from "@headlessui/react";
import InfoPopover from "./InforPopover";

const solutions = [
  { name: "About", description: "About The project.", href: "/about" },

];

export default function Example() {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeClassName = "text-text p-1 border-b-2 border-accent text-sm";

  return (
    <div>
      <Popover
        className={`fixed top-0 left-0 right-0 h-14 flex justify-center items-center z-20 transition-all duration-300 transform ${showShadow
          ? "shadow-sm shadow-black/20 bg-primary backdrop-blur-sm"
          : "shadow-none"
          }`}
      >
        <div className="container mx-auto flex flex-row justify-between items-center px-4 lg:px-0">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <PopoverButton className="rounded-lg bg-accent p-2 text-text hover:bg-primary hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent">
              <span className="sr-only">Open menu</span>
              {/* Inline SVG for Menu Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
              </svg>
            </PopoverButton>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2  ">



            <section className="flex flex-row items-center gap-2">
              <div className="h-10 w-auto">
                <img
                  src="/logo.png"
                  alt="Remix"
                  className="block h-10 w-auto dark:hidden"
                />
                <img
                  src="/logo.png"
                  alt="Remix"
                  className="hidden h-10 w-auto dark:block"
                />
              </div>

              <p
                className="text-xl lg:text-xl relative font-semibold "
              >
                HealthInformationSystem
              </p>
            </section>



          </Link>

          {/* Desktop Navigation */}
          <PopoverGroup as="nav" className="hidden lg:flex gap-10">
            {solutions.map(({ name, href }) => (
              <NavLink
                key={name}
                to={href}
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "text-text hover:text-accent p-1 text-sm"
                }
              >
                {name}
              </NavLink>
            ))}
          </PopoverGroup>

          {/* <a href="https://docs.google.com/document/d/1Y8cRid9Nf5QnWll2-3ceofHnXwI0oJQtD8Z-Yck9Ecg/edit?usp=sharing" target="_blank" className="hidden sm:flex  flex-row items-center gap-2 bg-primary hover:bg-accent hover:text-text text-text2  px-4  justify-center h-14  text-sm ">
            white Paper
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10v10M7 17L17 7" /></svg>
          </a> */}

          <a href="https://docs.google.com/document/d/1xEcGqIAVK_g3ZPOaEei7W_eMiAZoOumgzkCvNBgna2U/edit?usp=sharing" target="_blank" className="hidden sm:flex  flex-row items-center gap-2 bg-priamary hover:bg-accent hover:text-text text-text2  px-4  justify-center h-14  text-sm ">
            Research
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10v10M7 17L17 7" /></svg>
          </a>



          {/* <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <InfoPopover />
            </div>
          </div> */}
        </div>

        {/* Mobile Menu */}
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel className="absolute inset-x-0 top-0 p-4 bg-primary shadow-lg lg:hidden">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <section className="flex flex-row items-center gap-2">

                  <div className="h-10 w-auto">
                    <img
                      src="/logo"
                      alt="Remix"
                      className="block h-10 w-auto dark:hidden"
                    />
                    <img
                      src="/logo.png-dark.png"
                      alt="Remix"
                      className="hidden h-10 w-auto dark:block"
                    />
                  </div>

                  <p
                    className="text-xl lg:text-xl relative font-extrabold "
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    HealthInformationystem
                  </p>

                </section>

              </Link>
              <PopoverButton className="bg-accent p-2 rounded-lg text-white hover:bg-primary hover:text-accent">
                <span className="sr-only">Close menu</span>
                {/* Inline SVG for Close Icon */}
                x
              </PopoverButton>
            </div>
            <div className="mt-4">
              <nav className="grid gap-4">
                {solutions.map(({ name, href }) => (
                  <Link
                    key={name}
                    to={href}
                    className="block text-text hover:text-accent p-2 rounded-md"
                  >
                    {name}
                  </Link>
                ))}
              </nav>
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
}
