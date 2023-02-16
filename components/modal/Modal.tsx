import { useState } from "react";
import ReactDOM from "react-dom";

import { AiFillCloseCircle } from "react-icons/ai";

import Backdrop from "./Backdrop";

import classes from "./Modal.module.scss";

interface IProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  close: () => void;
  disableBackgroundClick?: boolean;
}

const Modal: React.FC<IProps> = ({
  children,
  className,
  isOpen,
  close,
  disableBackgroundClick = false,
}) => {
  const [Animate, setAnimate] = useState(false);

  const Exit = () => {
    setAnimate(true);
    setTimeout(() => {
      close && close();
      setAnimate(false);
    }, 500);
  };

  let content = isOpen ? (
    <>
      <Backdrop onClick={!disableBackgroundClick ? () => Exit() : () => {}} />
      <section
        className={`${className ? className : ""} ${classes.Container} ${
          !disableBackgroundClick ? classes.ZIndex : ""
        } ${Animate ? classes.ScaleUp : classes.ScaleDown}`}
      >
        <AiFillCloseCircle onClick={Exit} className={classes.Close} />
        {children}
      </section>
    </>
  ) : null;

  return ReactDOM.createPortal(
    content,
    document.getElementById("Modal") as HTMLElement
  );
};

export default Modal;
