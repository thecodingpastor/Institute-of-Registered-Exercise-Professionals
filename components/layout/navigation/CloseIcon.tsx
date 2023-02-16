import classes from "./CloseIcon.module.scss";

import { IProps } from "./types";

const CloseIcon: React.FC<IProps> = ({ onClick, animate }) => {
  return (
    <div
      onClick={onClick}
      className={`${classes.Container} ${
        animate === "x-enter"
          ? classes.In
          : animate === "x-leave"
          ? classes.Out
          : ""
      }`}
    >
      &times;
    </div>
  );
};

export default CloseIcon;
