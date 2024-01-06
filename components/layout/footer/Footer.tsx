import Location from "../../home/Location";

import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <>
      <Location />
      <small className={classes.Container}>
        <div>
          <span>&copy;Institute of (Registered) Exercise Professionals.</span>
          <span>All rights reserved. 2014 - {new Date().getFullYear()}</span>
        </div>
        <a href="https://michaelayeni.com" target="_blank">
          Powered by The Coding Pastor
        </a>
      </small>
    </>
  );
};

export default Footer;
