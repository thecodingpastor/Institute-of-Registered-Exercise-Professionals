import classes from "./HamburgerIcon.module.scss";

import { IProps } from "./types";
const HamburgerIcon: React.FC<IProps> = ({ onClick, animate }) => {
  return (
    <div
      className={`${classes.Container} ${
        animate === "x-leave"
          ? classes.In
          : animate === "x-enter"
          ? classes.Out
          : ""
      }`}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerIcon;
