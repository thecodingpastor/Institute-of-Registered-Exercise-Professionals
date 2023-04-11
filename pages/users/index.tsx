import { useEffect } from "react";

import { SelectAuth } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";

import Transition from "../../components/general/Transition";
import AdminRoute from "../../components/layout/AdminRoutes";
import { GetUsers } from "../../features/auth/authApi";
import UserComponent from "../../features/auth/components/UserComponent";

import classes from "./UsersPage.module.scss";
import useAxiosProtected from "../../hooks/useAxiosProtected";
import Skeleton from "../../components/loaders/Skeleton";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { usersList, user, userLoading } = useAppSelector(SelectAuth);
  // Had to attach accessToken to header
  useAxiosProtected();

  useEffect(() => {
    if (user?.role !== "staff" && usersList.length === 0) {
      dispatch(GetUsers());
    }
  }, [user]);

  if (userLoading === "default")
    // @ts-ignore
    return [...Array(10).keys()].map((i) => <Skeleton key={i} />);

  return (
    <AdminRoute>
      <Transition mode="scale-out" className={classes.Container}>
        <h1>Our Team</h1>
        <div className={classes.UsersList}>
          {usersList.map((u) => (
            <UserComponent key={u._id} {...u} />
          ))}
        </div>
      </Transition>
    </AdminRoute>
  );
};

export default UsersPage;
