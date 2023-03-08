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
  const [Animate, setAnimate] = useState(false);
  const [IsPaused, setIsPaused] = useState(false);
  const [ToastIsVisible, setToastIsVisible] = useState(false);
  const [CountDown, setCountDown] = useState(closeAfter);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!IsPaused) {
      timer = setInterval(() => {
        Exit();
      }, CountDown);
    }

    return () => clearInterval(timer);
  }, [content, CountDown, IsPaused]);

  const Exit = () => {
    setAnimate(true);
    setTimeout(() => {
      onClose();
      setAnimate(false);
    }, 500);
  };

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (!IsPaused) {
      timer = setInterval(() => {
        setCountDown((prev) => {
          // I had to do this hack to ensure the animations work
          if (prev < 2000) setToastIsVisible(false);
          return prev - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [IsPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    setToastIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className={`${classes.Container} ${Animate ? classes.Out : ""} ${
        IsError ? classes.Error : ""
      } ${IsPaused ? classes.IsPaused : ""} ${
        ToastIsVisible ? classes.ToastIsVisible : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
