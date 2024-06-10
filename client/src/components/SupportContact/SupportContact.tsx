import { Fragment, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TfiHeadphoneAlt } from "react-icons/tfi";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function SupportContact() {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex justify-center items-center">
            <TfiHeadphoneAlt className="!w-5 !h-5" />

            {/* <span>{currentUser.username}</span> */}
            {/* <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div
                style={{
                  padding: "16px 16px 12px",
                  borderWidth: "0px 0px thin",
                  borderColor: "rgba(145, 158, 171, 0.2)",
                  borderStyle: "dashed",
                }}
              >
                <h6 className=" text-[0.875rem] font-[600] capitalize flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="!w-5 !h-5 text-blue-600"
                 
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clip-rule="evenodd"
                  ></path>
                </svg> Contact us
                </h6>
              </div>

              <div
                style={{
                  borderWidth: "0px 0px thin",
                  borderColor: "rgba(145, 158, 171, 0.2)",
                  borderStyle: "dashed",
                }}
              >
                <div
                  style={{
                    padding: "16px 16px 12px",
                    borderWidth: "0px 0px thin",
                    borderColor: "rgba(145, 158, 171, 0.2)",
                    borderStyle: "dashed",
                  }}
                >
                  <p className=" text-[0.875rem] font-[400] ">
                    Toll Free | 9:30 AM to 6:30 PM (Mon-Sun)
                  </p>
                  <h5 className=" text-[0.875rem] font-[600] capitalize mt-2">
                  +237-695-451-646
                  </h5>
                </div>
                <div
                  style={{
                    padding: "16px 16px 12px",
                    borderWidth: "0px 0px thin",
                    borderColor: "rgba(145, 158, 171, 0.2)",
                    borderStyle: "dashed",
                  }}
                >
                  <p className=" text-[0.875rem] font-[400] ">
                    Toll Free | 9:30 AM to 6:30 PM (Mon-Sun)
                  </p>
                  <h5 className=" text-[0.875rem] font-[600] capitalize mt-2">
                    1800-41-99099
                  </h5>
                </div>
                <div
                  style={{
                    padding: "16px 16px 12px",
                    borderWidth: "0px 0px thin",
                    borderColor: "rgba(145, 158, 171, 0.2)",
                    borderStyle: "dashed",
                  }}
                >
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                  >
                    Request a Call Back
                  </button>
                </div>
                <div
                  style={{
                    padding: "16px 16px 12px",
                    fontSize: "12px",
                  }}
                >
                  <span>
                    To check all the FAQ <span className="text-blue-500">click here</span>
                  </span>
                </div>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
