import { BsFillTrashFill } from "react-icons/bs";
import Spin from "../../../components/loaders/Spin";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import caps from "../../../utils/caps";
import { SelectUI, SetConfirmModal } from "../../UI/UISlice";
import { DeleteUser } from "../authApi";
import { SelectAuth } from "../authSlice";
import { User } from "../types";

import classes from "./UserComponent.module.scss";
import UserRoleRadio from "./UserRoleRadio";

const UserComponent: React.FC<User> = ({
  _id,
  email,
  firstName,
  lastName,
  role,
}) => {
  const dispatch = useAppDispatch();
  const { user, userLoading } = useAppSelector(SelectAuth);
  const { confirmModalIsOpen } = useAppSelector(SelectUI);

  const CloseConfirmModal = () => {
    dispatch(SetConfirmModal(null));
  };

  return (
    <div className={classes.Container}>
      <h3>
        {caps(firstName)} {caps(lastName)}
      </h3>
      <p>{email}</p>
      <div className={classes.Buttons}>
        {user?.role === "superuser" && (
          <BsFillTrashFill
            title="Delete User"
            className={classes.Delete}
            onClick={() => dispatch(SetConfirmModal(_id))}
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
    </div>
  );
};

export default UserComponent;
