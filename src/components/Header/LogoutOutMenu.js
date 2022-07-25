import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

const LogoutOutMenu = () => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const logout = useLogout();
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="fixed top-[1.25%] right-3 w-56 text-right ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-r-md rounded-b-md bg-transparent px-4 py-2 text-sm font-medium text-white h-10 ">
            <FontAwesomeIcon
              icon={faCoffee}
              inverse
              className="ml-2 -mr-2 h-5 w-5 text-white hover:text-orange-300"
              aria-hidden="true"
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
          <Menu.Items className="absolute right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 text-sm">
              <div className="text-white flex justify-between px-2 py-2">
                <div className="font-semibold">{t("username")}</div>
                <div className="text-right">{auth.username}</div>
              </div>
            </div>
            <div className="px-1 py-1 flex justify-between">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-orange-300 text-white" : "text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FontAwesomeIcon
                        icon={faGear}
                        inverse
                        className="mr-2 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faGear}
                        inverse
                        className="mr-2 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    )}
                    Preferences
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={signOut}
                    className={`${
                      active ? "bg-orange-300 text-white" : "text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <span className="mr-2">Logout</span>

                    {active ? (
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        inverse
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        inverse
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LogoutOutMenu;
