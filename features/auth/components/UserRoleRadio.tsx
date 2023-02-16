import { useAppDispatch } from "../../../fetchConfig/store";
import caps from "../../../utils/caps";
import { ChangeUserRole } from "../authApi";
import { UserRole } from "../types";
import classes from "./UserRoleRadio.module.scss";

type IProps = {
  role: UserRole;
  _id: string;
  userLoading: string;
};

const allowedValues = ["admin", "staff"];

const UserRoleRadio: React.FC<IProps> = ({ role, _id, userLoading }) => {
  const dispatch = useAppDispatch();

  const handleChange = (role: string) => {
    dispatch(ChangeUserRole({ userId: _id, role: role }));
  };

  return (
    <div className={classes.Container}>
      {allowedValues.map((v) => (
        <span key={v}>
          <input
            id={_id + v}
            type="radio"
            name={"role" + _id}
            value={v}
            checked={role === v}
            onChange={() => handleChange(v)}
            disabled={_id === userLoading || role === v}
          />
          <label htmlFor={_id + v}>{caps(v)}</label>
          <br />
        </span>
      ))}
    </div>
  );
};

export default UserRoleRadio;
