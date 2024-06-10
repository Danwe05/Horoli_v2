import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import NavLinks from "./NavLinks";
import "@ionic/react/css/core.css";
import { IonIcon } from "@ionic/react";

import { setupIonicReact } from "@ionic/react";
import { ProfileMenu } from "../profileMenu/ProfileMenu";
import { SupportContact } from "../SupportContact/SupportContact";
import { LanguageSelector } from "../languageSelector/LanguageSelector";

setupIonicReact();

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser }: any = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <>
      <nav
        className="bg-white relative shadow-sm flex justify-center w-full !fixed top-0 py-2"
        style={{ zIndex: "999" }}
      >
        <div className="flex items-center font-medium justify-around">
          <div className="z-50 mr-10 md:w-auto w-full flex justify-between">
            <Link
              to="/"
              className="block antialiased font-sans cursor-pointer py-1.5 font-bold flex-auto text-blue-500 text-xl"
            >
              HoroHouse
            </Link>
            <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
              <IonIcon name={`${open ? "close" : "menu"}`}></IonIcon>
            </div>
          </div>
          <ul className="md:flex hidden capitalize items-center justify-center text-center font-[Poppins]">
            <li className="text-center px-3 text-sm uppercase">
              <Link to="/list" className="">
                Buy
              </Link>
            </li>
            <li className="text-center px-3 text-sm uppercase">
              <Link to="/" className="">
                Sell
              </Link>
            </li>
            <li className="text-center px-3 text-sm uppercase">
              <Link to="/" className="">
                Rent
              </Link>
            </li>
            <li className="text-center px-3 text-sm uppercase">
              <Link to="/" className="">
                Home Loans
              </Link>
            </li>
            <NavLinks />
            <li className="text-center px-3 text-sm uppercase">
              <Link to="/" className="">
                Advertise
              </Link>
            </li>
            <li className="text-center px-3 text-sm uppercase">
              <Link to="/" className="">
                Help
              </Link>
            </li>
          </ul>
          <div className="md:block hidden"></div>

          <div className="md:flex hidden ml-10 gap-5 justify-center items-center">
            {/* <NotificationsMenu /> */}
            <LanguageSelector />
            <SupportContact />
            <ProfileMenu />
          </div>

          {/* Mobile nav */}
          <ul
            className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
          >
            <li>
              <Link to="/" className="py-7 px-3 inline-block">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="py-7 px-3 inline-block">
                Home
              </Link>
            </li>
            <NavLinks />
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
