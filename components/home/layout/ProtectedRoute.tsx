import Router from "next/router";
import { useAppSelector } from "../../../fetchConfig/store";
import { SelectAuth } from "../../../features/auth/authSlice";
import AuthPageLoading from "../../loaders/AuthPageLoading";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken } = useAppSelector(SelectAuth);
  if (!accessToken) {
    Router.replace("/");
    return <AuthPageLoading />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
