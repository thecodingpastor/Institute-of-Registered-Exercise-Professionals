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
import Announcement from "../../general/Announcement";
import { SelectAuth } from "../../../features/auth/authSlice";
import {
  SelectCourse,
  SetAnnouncementAlert,
} from "../../../features/course/courseSlice";
import { RxOpenInNewWindow } from "react-icons/rx";
import useAnnouncement from "./useAnnouncement";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector(SelectAuth);
  const { announcements, announcementIsOpen } = useAppSelector(SelectCourse);
  const { replace } = useRouter();

  const [ShowSideNav, setShowSideNav] = useState(false);
  const [Animate, setAnimate] = useState<MenuMode>("x-leave");
  const ActiveAnnouncement = useAnnouncement(announcements);

  const handleHamburgerClick = () => {
    if (ShowSideNav) {
      setShowSideNav(false);
      setAnimate("x-leave");
    } else {
      setAnimate("x-enter");
      setShowSideNav(true);
    }
  };

  const handleLogout = () => {
    if (ShowSideNav) setShowSideNav(false);

    dispatch(LogOut()).then(() => {
      replace("/");
    });
  };

  const navData = accessToken
    ? user?.role === "staff"
      ? AuthNavData.filter((data) => !data.isAdmin)
      : AuthNavData
    : NavData;

  const AnnouncementParam =
    ActiveAnnouncement ||
    announcements.find(
      (ann) => ann.isGeneral && new Date(ann?.date).getTime() > Date.now()
    );

  return (
    <>
      {announcementIsOpen && (
        <Announcement
          announcement={AnnouncementParam}
          close={() => dispatch(SetAnnouncementAlert(false))}
        />
      )}
      <header className={classes.Container}>
        <Logo />

        <nav>
          <Link
            href="/course"
            className={classes.CTA + " Pulse"}
            title="Buy Courses"
          >
            Courses
          </Link>
          {user && <span>{caps(user.firstName)}</span>}
          {["admin", "superuser"].includes(user?.role) && (
            <a href="https://corporate.ireplearning.com.ng">
              <RxOpenInNewWindow />
            </a>
          )}
          <div>
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
          </div>
        </nav>
      </header>
      <HamburgerContainer
        IsOpen={ShowSideNav}
        onClick={handleHamburgerClick}
        animate={Animate}
        setAnimate={setAnimate}
      />
      <SideNav onClose={handleHamburgerClick} animate={Animate} />
    </>
  );
};

export default Navigation;
