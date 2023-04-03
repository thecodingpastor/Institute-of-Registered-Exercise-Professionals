import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import { SelectAuth } from "../../features/auth/authSlice";
import { AddAlertMessage } from "../../features/UI/UISlice";
import useRefreshToken from "../../hooks/useRefreshToken";

import AuthPageLoading from "../loaders/AuthPageLoading";

interface IProps {
  children: React.ReactNode;
}

const PersistLogin: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [IsLoading, setIsLoading] = useState(true);
  const { accessToken } = useAppSelector(SelectAuth);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const VerifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err: any) {
        dispatch(
          AddAlertMessage({
            message: err.response?.data?.message,
          })
        );
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !accessToken && isMounted ? VerifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return IsLoading ? <AuthPageLoading /> : <>{children}</>;
};

export default PersistLogin;
