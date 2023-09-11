import React from "react";
import Logo from "./utils/Logo";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "./utils/axios";

import DismissableAlert from "./alerts";
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Trending", href: "#", current: false },
  { name: "Chat", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AuthenticatedUserOptions({ author, navigate }) {
  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("bird-person-web.auth.token");
    // setAlertMessages([]);
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
              "block px-4 py-2 text-sm "
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
              "block px-4 py-2 text-sm "
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
              "block px-4 py-2 text-sm "
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
    localStorage.removeItem("bird-person-web.auth.token");
    // setAlertMessages([]);
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
              "block px-4 py-2 text-sm "
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
  const [author, setAuthor] = useState({});
  const navigate = useNavigate();
  let headers = {
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("bird-person-web.auth.token")) {
    headers["Authorization"] =
      "Bearer " + localStorage.getItem("bird-person-web.auth.token");
  }

  useEffect(() => {
    const f = async () => {
      try {
        if (localStorage.getItem("bird-person-web.auth.token") != null) {
          const authorRes = await axios({
            method: "get",
            url: "/users",
            headers: headers,
          });
          setAuthor(authorRes.data);
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
      <Disclosure as="nav" className="sticky top-0 z-10 bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="./logo.png"
                      alt="Blitter"
                    />
                    <Logo />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>

                  <input
                    type="text"
                    className=" rounded-md border bg-white py-2 pl-10 pr-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="Search"
                  />
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    id="theme-toggle"
                    type="button"
                    className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    <svg
                      id="theme-toggle-dark-icon"
                      className={darkMode ? "h-5 w-5" : "hidden h-5 w-5"}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg
                      id="theme-toggle-light-icon"
                      className={darkMode ? "hidden h-5 w-5" : "h-5 w-5"}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
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
                        {localStorage.getItem("bird-person-web.auth.token") ? (
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
                      "block rounded-md px-3 py-2 text-base font-medium"
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
      <Outlet className="flex min-h-screen grow flex-col" />
    </>
  );
}
