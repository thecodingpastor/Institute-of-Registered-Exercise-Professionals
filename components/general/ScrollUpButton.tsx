import { useState, useEffect } from "react";
import classes from "./ScrollUpButton.module.scss";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollUpButton = () => {
  const [ScrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollEvent = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  return (
    <div
      className={`${classes.Container} ${
        ScrollPosition > 500 ? classes.Show : classes.Hide
      }`}
      onClick={() => {
        window.scroll({
          top: 0,
        });
      }}
    >
      <AiOutlineArrowUp />
    </div>
  );
};

export default ScrollUpButton;
