import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { NavData, AuthNavData } from "./data";
import { LogOut } from "../../../features/auth/authApi";
import { useRouter } from "next/router";

import { RxOpenInNewWindow } from "react-icons/rx";

type IProps = {
  handleClose: () => void;
};

const SideNavContent: React.FC<IProps> = ({ handleClose }) => {
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { replace } = useRouter();

  const handleLogout = () => {
    handleClose();
    dispatch(LogOut()).then(() => {
      replace("/");
    });
  };

  const navData = accessToken
    ? user?.role === "staff"
      ? AuthNavData.filter((data) => !data.isAdmin)
      : AuthNavData
    : NavData;

  return (
    <>
      {["admin", "superuser"].includes(user?.role) && (
        <a href="https://corporate.ireplearning.com.ng">
          <RxOpenInNewWindow /> Corporate
        </a>
      )}
      {navData.map((item) => (
        <span
          key={item.title}
          onClick={
            item.title === "Logout" ? () => handleLogout() : () => handleClose()
          }
        >
          <Link href={item.href}>{item.title}</Link>
        </span>
      ))}
    </>
  );
};

export default SideNavContent;
