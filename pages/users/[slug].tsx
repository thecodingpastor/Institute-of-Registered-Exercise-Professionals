import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import { SelectAuth } from "../../features/auth/authSlice";
import { GetClientForStaff } from "../../features/auth/authApi";

import useAxiosProtected from "../../hooks/useAxiosProtected";
import Transition from "../../components/general/Transition";

import classes from "./StaffClientsPage.module.scss";
import AuthPageLoading from "../../components/loaders/AuthPageLoading";
import Link from "next/link";

const StaffClientsPage = () => {
  useAxiosProtected();
  const { assignClientsToStaff, usersList } = useAppSelector(SelectAuth);
  const dispatch = useAppDispatch();

  const {
    query: { role, slug },
  } = useRouter();

  const currentUser = usersList.find((u) => u._id === slug);
  const fullName = currentUser?.firstName + " " + currentUser?.lastName;

  useEffect(() => {
    dispatch(GetClientForStaff({ userId: slug, page: 1, role }));
  }, []);

  if (assignClientsToStaff === "loading") return <AuthPageLoading />;

  return (
    <Transition mode="scale-out" className={classes.Container}>
      <h3 className="text-center">
        Clients Assigned to{" "}
        <span style={{ textTransform: "capitalize" }}>{fullName}. </span>
      </h3>
      <ul style={{ textTransform: "capitalize" }}>
        {assignClientsToStaff.length === 0 ? (
          <div>
            There are no clients assigned to{" "}
            <span style={{ textTransform: "capitalize" }}>{fullName}</span> yet.
          </div>
        ) : (
          assignClientsToStaff?.map((staff) => (
            <Link
              target="_blank"
              href={"http://localhost:3000/user?userId=" + staff?._id}
              key={staff?._id}
            >
              {staff?.firstName} {staff?.lastName} <span>{staff?.role}</span>
            </Link>
          ))
        )}
      </ul>
    </Transition>
  );
};

export default StaffClientsPage;
