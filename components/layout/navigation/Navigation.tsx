import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { AuthNavData, NavData } from "./data";

import Logo from "./Logo";
import SideNav from "./SideNav";
import HamburgerContainer from "./HamburgerContainer";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { LogOut } from "../../../features/auth/authApi";

import { MenuMode } from "./types";

import classes from "./Navigation.module.scss";
import caps from "../../../utils/caps";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const { push } = useRouter();

  const [ShowSideNav, setShowSideNav] = useState(false);
  // const [ShowContactModal, setShowContactModal] = useState(false);
  const [Animate, setAnimate] = useState<MenuMode>("x-leave");

  const handleHamburgerClick = () => {
    if (ShowSideNav) {
      setShowSideNav(false);
      setAnimate("x-leave");
    } else {
      setAnimate("x-enter");
      setShowSideNav(true);
    }
  };

  // const ToggleContactModal = () => {
  //   setShowContactModal((prev) => !prev);
  // };

  const handleLogout = () => {
    if (ShowSideNav) setShowSideNav(false);
    dispatch(LogOut()).then(() => push("/"));
  };

  const navData = accessToken
    ? user?.role === "staff"
      ? AuthNavData.filter((data) => !data.isAdmin)
      : AuthNavData
    : NavData;
  return (
    <>
      <HamburgerContainer
        IsOpen={ShowSideNav}
        onClick={handleHamburgerClick}
        animate={Animate}
        setAnimate={setAnimate}
      />

      {/* <SideNav
        onClose={handleHamburgerClick}
        animate={Animate}
        ToggleContactModal={ToggleContactModal}
      /> */}

      <header className={classes.Container}>
        <Logo />

        <nav>
          <Link href="/course" className={classes.Buy} title="Buy Courses">
            Courses
          </Link>
          {user && <span>{caps(user.firstName)}</span>}
          {navData.map((item) => (
            <Link
              href={item.href}
              title={item.title}
              key={item.title}
              onClick={item.title === "Logout" && handleLogout}
            >
              <item.icon />
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Navigation;
