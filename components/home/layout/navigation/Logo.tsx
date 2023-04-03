import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SelectAuth } from "../../../../features/auth/authSlice";
import { useAppSelector } from "../../../../fetchConfig/store";

import classes from "./Logo.module.scss";

const Logo = () => {
  const { accessToken, user } = useAppSelector(SelectAuth);
  const { push } = useRouter();

  const handleNavigate = () => {
    if (accessToken) {
      if (user?.role === "staff") push("/");
      else push("/register");
    } else push("/login");
  };

  return (
    <Link href="/" className={classes.Container} onDoubleClick={handleNavigate}>
      <Image
        src="/images/logo.png"
        alt="Institute of Registered Exercise Professionals' Logo"
        width={700}
        height={700}
      />
    </Link>
  );
};

export default Logo;
