import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { SelectUI, SetConfirmModal } from "../../UI/UISlice";
import { DeleteUser, ResetClientsTreated } from "../authApi";
import { SelectAuth } from "../authSlice";

import { BsFillTrashFill } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";

import { User } from "../types";

import Spin from "../../../components/loaders/Spin";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import UserRoleRadio from "./UserRoleRadio";

import classes from "./UserComponent.module.scss";

const UserComponent: React.FC<User> = ({
  _id,
  email,
  firstName,
  lastName,
  role,
  numberOfClientsDone,
  totalNumberOfClientsDone,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userLoading, user } = useAppSelector(SelectAuth);
  const { confirmModalIsOpen } = useAppSelector(SelectUI);

  const CloseConfirmModal = () => {
    dispatch(SetConfirmModal(null));
  };

  const canClick = ["fitnessCoach", "nutritionist"].includes(role);

  return (
    <div className={classes.Container}>
      <span className={classes.left}>{totalNumberOfClientsDone || 0}</span>
      <span className={classes.abs}>{numberOfClientsDone || 0}</span>
      <div
        className={classes.Name}
        onClick={
          canClick
            ? () => router.push({ pathname: "/users/" + _id, query: { role } })
            : () => {}
        }
      >
        {firstName} {lastName}
      </div>
      <p>{email}</p>
      <div className={classes.Buttons}>
        {user?.role === "superuser" && (
          <BsFillTrashFill
            title="Delete User"
            className={classes.Delete}
            onClick={() => dispatch(SetConfirmModal(_id))}
          />
        )}

        {["superuser", "admin"].includes(user?.role) && (
          <BiRefresh
            title="Reset Client Assigned to User"
            className={classes.Reset}
            onClick={() => dispatch(SetConfirmModal("reset" + _id))}
          />
        )}
      </div>

      {role !== "superuser" && (
        <UserRoleRadio role={role} _id={_id} userLoading={userLoading} />
      )}

      {confirmModalIsOpen === _id && (
        <ConfirmModal
          isOpen={confirmModalIsOpen === _id}
          loading={_id === userLoading}
          close={CloseConfirmModal}
          proceedWithAction={() => {
            dispatch(DeleteUser(_id)).then(() =>
              dispatch(SetConfirmModal(null))
            );
          }}
          closeButtonText={userLoading === _id ? <Spin /> : "Delete User"}
        />
      )}

      {confirmModalIsOpen === "reset" + _id && (
        <ConfirmModal
          isOpen={confirmModalIsOpen === "reset" + _id}
          loading={_id === userLoading}
          close={CloseConfirmModal}
          message="If you go ahead, the number of clients this user has attended to WILL BE SET TO ZERO (O). Go ahead?"
          proceedWithAction={() => {
            dispatch(ResetClientsTreated(_id)).then(() =>
              dispatch(SetConfirmModal(null))
            );
          }}
          closeButtonText={userLoading === _id ? <Spin /> : "Reset User"}
        />
      )}
    </div>
  );
};

export default UserComponent;
