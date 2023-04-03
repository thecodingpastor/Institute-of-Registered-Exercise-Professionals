import Router from "next/router";
import { useAppSelector } from "../../../fetchConfig/store";
import { SelectAuth } from "../../../features/auth/authSlice";
import AuthPageLoading from "../../loaders/AuthPageLoading";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppSelector(SelectAuth);
  if (!user || user?.role === "staff") {
    Router.replace("/");
    return <AuthPageLoading />;
  }

  return <>{children}</>;
};

export default AdminRoute;
