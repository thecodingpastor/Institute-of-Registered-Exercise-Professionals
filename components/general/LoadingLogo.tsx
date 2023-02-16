import { useEffect, useState } from "react";

import Image from "next/image";
import classes from "./LoadingLogo.module.scss";

const LoadingLogo = () => {
  const [Animate, setAnimate] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setAnimate(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${classes.Container} ${Animate ? classes.Animate : ""}`}>
      <figure>
        <Image
          src="/head.png"
          fill
          alt="Michael Ayeni"
          className="round"
          priority
        />
      </figure>
    </div>
  );
};

export default LoadingLogo;
