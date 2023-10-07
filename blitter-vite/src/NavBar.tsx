import React from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import DismissableAlert from "./components/Alert";
import { AuthorRes, UsersApi } from "./generated-sources/openapi";
import { getApiConfigurationFactory } from "./api/FactoryProvider";
import Logo from "./components/Logo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AuthenticatedUserOptions({ author, navigate }) {
  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("blitter.auth.token");
    navigate("/login");
  }
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link
            to={"/users/" + author.username}
            className={classNames(
              active ? " bg-gray-900 text-gray-50" : "",
              "block px-4 py-2 text-sm ",
            )}
          >
            Your Profile
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? " bg-gray-900 text-gray-50" : "",
              "block px-4 py-2 text-sm ",
            )}
          >
            Settings
          </a>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <a
            href="#"
            onClick={handleLogout}
            className={classNames(
              active ? "bg-red-600 text-gray-50 " : "",
              "block px-4 py-2 text-sm ",
            )}
          >
            Sign out
          </a>
        )}
      </Menu.Item>
    </>
  );
}

function UnAuthenticatedUserOptions({ navigate }) {
  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("blitter.auth.token");
    navigate("/login");
  }
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link
            to={"/login/"}
            className={classNames(
              active ? " bg-gray-900 text-gray-50" : "",
              "block px-4 py-2 text-sm ",
            )}
          >
            Login
          </Link>
        )}
      </Menu.Item>
    </>
  );
}
export default function NavBar({
  alertMessages,
  setAlertMessages,
  darkMode,
  setDarkMode,
}) {
  const [currentNav, setCurrentNav] = useState("Home");
  const navigation = [
    { name: "Home", href: "/home", current: currentNav === "Home" },
    { name: "Feed", href: "/feed", current: currentNav === "Feed" },
  ];
  const [author, setAuthor] = useState<AuthorRes>({
    profileUrl: "https://robohash.org/anonymous.png",
  });
  const navigate = useNavigate();
  const configuration = getApiConfigurationFactory();
  const usersApi: UsersApi = new UsersApi(configuration);

  useEffect(() => {
    const f = async () => {
      try {
        const authorRes = await usersApi.getSelf();
        if (authorRes.status === 200) {
          if (authorRes.data.profileUrl != null) setAuthor(authorRes.data);
        }
      } catch (error) {
        setAuthor({
          profileUrl: "https://robohash.org/anonymous.png",
        });
        console.log(error);
      }
    };
    f();
  }, []);
  return (
    <>
      {alertMessages &&
        alertMessages.map((alertMessage) => {
          return <DismissableAlert alertMessage={alertMessage} />;
        })}
      <Disclosure
        as="div"
        className="top-0 z-10 bg-gray-800 fixed top-0 left-0 right-0 z-10"
      >
        {({ open }) => (
          <>
            <div className="px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-start">
                  <Logo />
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={(event) => {
                            navigate(item.href);
                            setCurrentNav(item.name);
                          }}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </span>

                  <input
                    type="text"
                    className="rounded-md border bg-white py-2 pl-10 pr-4 text-gray-700  dark: dark:bg-gray-900 dark:text-gray-300 "
                    placeholder="Search"
                  />
                </div>

                <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    id="theme-toggle"
                    type="button"
                    className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
                    onClick={() =>
                      setDarkMode(darkMode === "true" ? "false" : "true")
                    }
                  >
                    <MoonIcon
                      fill="currentColor"
                      className={
                        darkMode === "true" ? "h-5 w-5" : "hidden h-5 w-5"
                      }
                    />
                    <SunIcon
                      className={
                        darkMode === "true" ? "hidden h-5 w-5" : "h-5 w-5"
                      }
                      fill="currentColor"
                    />
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={author.profileUrl}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:text-gray-50">
                        {localStorage.getItem("blitter.auth.token") ? (
                          <AuthenticatedUserOptions
                            author={author}
                            navigate={navigate}
                          />
                        ) : (
                          <UnAuthenticatedUserOptions navigate={navigate} />
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
