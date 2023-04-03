import ReactDOM from "react-dom";

import Backdrop from "../../../modal/Backdrop";

import classes from "./SideNav.module.scss";
import SideNavContent from "./SideNavContent";

import { SideNavProps } from "./types";

const SideNav: React.FC<SideNavProps> = ({ onClose, animate }) => {
  let content = (
    <>
      {animate === "x-enter" && <Backdrop onClick={onClose} />}
      <div
        className={`${classes.Container} ${
          animate === "x-enter"
            ? classes.In
            : animate === "x-leave"
            ? classes.Out
            : ""
        }`}
      >
        <SideNavContent handleClose={onClose} />
      </div>
    </>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("SideNav") as HTMLElement
  );
};

export default SideNav;
