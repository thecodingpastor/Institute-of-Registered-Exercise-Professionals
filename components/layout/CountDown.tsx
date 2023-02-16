import Link from "next/link";
import { useEffect, useState } from "react";
import Timer from "../../utils/timer";

import classes from "./CountDown.module.scss";

const params = "May 1, 2023 00:00:00"; // to be got from the backend

const CountDown = () => {
  const [RemainingTime, setRemainingTime] = useState({
    textDay: 0,
    textHour: 0,
    textMinute: 0,
    textSecond: 0,
  });

  useEffect(() => {
    let timer: NodeJS.Timer = setInterval(() => {
      const rem = Timer(params);
      setRemainingTime(rem);
    }, 1000);

    return () => clearInterval(timer);
  }, [params]);

  return (
    <article className={classes.Container}>
      <div className={classes.Box}>
        <p>{RemainingTime.textDay}</p>
        <p>Days</p>
      </div>
      <div className={classes.Box}>
        <p>{RemainingTime.textHour}</p>
        <p>Hours</p>
      </div>
      <div className={classes.Box}>
        <p>{RemainingTime.textMinute}</p>
        <p>Minutes</p>
      </div>
      <div className={classes.Box}>
        <p>{RemainingTime.textSecond}</p>
        <p>Seconds</p>
      </div>
      <Link href="#" className="Pulse">
        Learn More
      </Link>
    </article>
  );
};

export default CountDown;
