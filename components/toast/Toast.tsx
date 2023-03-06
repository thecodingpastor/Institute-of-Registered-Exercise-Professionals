import { useState, useEffect } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

import classes from "./Toast.module.scss";

interface IProps {
  content: React.ReactNode;
  onClose: () => void;
  IsError?: boolean;
  closeAfter?: number;
}

const Toast: React.FC<IProps> = ({ content, onClose, closeAfter, IsError }) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      Exit();
    }, closeAfter);

    return () => clearTimeout(timer);
  }, [content]);

  const [Animate, setAnimate] = useState(false);

  const Exit = () => {
    setAnimate(true);
    setTimeout(() => {
      onClose();
      setAnimate(false);
    }, 500);
  };

  return (
    <div
      className={`${classes.Container} ${Animate ? classes.Out : ""} ${
        IsError ? classes.Error : ""
      }`}
    >
      {IsError ? (
        <BiErrorAlt className={classes.Cancel} />
      ) : (
        <FaCheckCircle className={classes.Check} />
      )}
      {content}
      <AiOutlineCloseCircle
        onClick={Exit}
        className={`${classes.Close} ${IsError ? classes.Error : ""}`}
      />
    </div>
  );
};

export default Toast;
