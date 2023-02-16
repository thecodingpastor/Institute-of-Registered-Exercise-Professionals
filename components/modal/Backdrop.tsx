import React from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.scss";

interface IProps {
  onClick: any;
  style?: any;
}

const Backdrop: React.FC<IProps> = ({ onClick, style }) => {
  return ReactDOM.createPortal(
    <div className={classes.Backdrop} onClick={onClick} style={style}></div>,
    document.getElementById("Backdrop") as HTMLElement
  );
};

export default Backdrop;
