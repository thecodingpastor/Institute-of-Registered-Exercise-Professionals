import { useEffect, useState } from "react";
import classes from "./Transition.module.scss";

interface IProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  mode?:
    | "fade"
    | "slide-right"
    | "slide-left"
    | "slide-up"
    | "slide-down"
    | "scale-in"
    | "scale-out";
}
const Transition: React.FC<IProps> = ({
  children,
  delay = 500,
  mode = "fade",
  className,
}) => {
  const [Stop, setStop] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setStop(true), delay);
    return () => clearTimeout(timer);
  }, []);

  let finalModeStyle;

  switch (mode) {
    case "slide-right":
      finalModeStyle = classes.SlideRight;
      break;
    case "slide-left":
      finalModeStyle = classes.SlideLeft;
      break;
    case "slide-up":
      finalModeStyle = classes.SlideUp;
      break;
    case "slide-down":
      finalModeStyle = classes.SlideDown;
      break;
    case "scale-in":
      finalModeStyle = classes.ScaleIn;
      break;
    case "scale-out":
      finalModeStyle = classes.ScaleOut;
      break;
    default:
      finalModeStyle = classes.Fade;
      break;
  }

  return (
    <section
      className={`${className ? className : ""} ${!Stop ? finalModeStyle : ""}`}
    >
      {children}
    </section>
  );
};

export default Transition;
