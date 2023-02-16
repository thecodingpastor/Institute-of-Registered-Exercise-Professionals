import CountDown from "../layout/CountDown";

import { AiFillCloseCircle } from "react-icons/ai";

import classes from "./Announcement.module.scss";

const Announcement = () => {
  return (
    <section className={classes.Container}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, illo!
        Totam pariatur facere commodi. Voluptatem illum laudantium veritatis
        perferendis quasi sunt, quis consectetur a, ex sapiente cupiditate
        asperiores ducimus qui.
      </p>
      <AiFillCloseCircle />
      <CountDown />
    </section>
  );
};

export default Announcement;
