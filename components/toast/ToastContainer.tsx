import ReactDOM from "react-dom";
import { VscCloseAll } from "react-icons/vsc";

import { useAppDispatch } from "../../fetchConfig/store";
import { AlertMessageType } from "../../features/UI/types";
import {
  ClearAlertMessages,
  RemoveAlertMessage,
} from "../../features/UI/UISlice";

import Toast from "./Toast";

import classes from "./ToastContainer.module.scss";

type Position =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface IProps {
  position?: Position;
  alertMessages: AlertMessageType[];
}

const ToastContainer: React.FC<IProps> = ({ position, alertMessages }) => {
  const dispatch = useAppDispatch();

  return ReactDOM.createPortal(
    <div className={classes.Container} data-position={position}>
      {alertMessages.length > 1 && (
        <span>
          <VscCloseAll
            className={classes.CloseAll}
            onClick={() => dispatch(ClearAlertMessages())}
          />
        </span>
      )}

      {alertMessages.map((alert) => (
        <Toast
          key={alert.id}
          IsError={alert.type === "fail"}
          content={alert.message}
          onClose={() => dispatch(RemoveAlertMessage(alert.id))}
          closeAfter={alert.type === "fail" ? 30000 : 7000}
        />
      ))}
    </div>,
    document.getElementById("Toast") as HTMLElement
  );
};

export default ToastContainer;
