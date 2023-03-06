import CountDown from "../layout/CountDown";

import { AiFillCloseCircle } from "react-icons/ai";

import classes from "./Announcement.module.scss";
import { AnnouncementType } from "../../features/course/types";

const Announcement: React.FC<{
  announcement: AnnouncementType;
  close: Function;
}> = ({ announcement, close }) => {
  const checkValid = new Date(announcement?.date).getTime() > Date.now();
  if (checkValid) {
    return (
      <section className={classes.Container}>
        <p className={classes.Announcement}>{announcement?.text}</p>
        <AiFillCloseCircle onClick={() => close()} />
        <CountDown date={announcement.date} link={announcement?.link} />
      </section>
    );
  } else return null;
};

export default Announcement;
