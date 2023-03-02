import { useAppDispatch } from "../fetchConfig/store";
import axios from "../fetchConfig/api/axios";

import { LogOut } from "../features/auth/authApi";
import { SetCredentials } from "../features/auth/authSlice";
import { AddAlertMessage } from "../features/UI/UISlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });
      dispatch(
        SetCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
        })
      );
      console.log("useRefreshToken => resonse ", response);
      return response.data.accessToken;
    } catch (err: any) {
      console.log("useRefreshToken => ", err);

      dispatch(
        AddAlertMessage({ message: err.response.data.message, type: "fail" })
      );
      dispatch(LogOut());
    }
  };
  return refresh;
};

export default useRefreshToken;
