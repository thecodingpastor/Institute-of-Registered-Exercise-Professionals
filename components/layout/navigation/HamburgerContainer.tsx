import CloseIcon from "./CloseIcon";
import HamburgerIcon from "./HamburgerIcon";

import classes from "./HamburgerContainer.module.scss";

import { HamburgerContainerProps } from "./types";

const HamburgerContainer: React.FC<HamburgerContainerProps> = ({
  IsOpen,
  onClick,
  animate,
}) => {
  return (
    <div className={classes.Container} onClick={onClick}>
      {IsOpen ? (
        <CloseIcon onClick={onClick} animate={animate} />
      ) : (
        <HamburgerIcon onClick={onClick} animate={animate} />
      )}
    </div>
  );
};

export default HamburgerContainer;
