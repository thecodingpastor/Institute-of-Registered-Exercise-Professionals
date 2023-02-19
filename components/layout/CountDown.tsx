import Link from "next/link";
import { useEffect, useState } from "react";
import Timer from "../../utils/timer";
import Spin from "../loaders/Spin";

import classes from "./CountDown.module.scss";

const CountDown = ({ date, link }) => {
  const [RemainingTime, setRemainingTime] = useState({
    textDay: 0,
    textHour: 0,
    textMinute: 0,
    textSecond: 0,
  });

  useEffect(() => {
    let timer: NodeJS.Timer = setInterval(() => {
      const rem = Timer(date);
      setRemainingTime(rem);
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

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
      <Link href={link} className="Pulse">
        Learn More
      </Link>
    </article>
  );
};

export default CountDown;
