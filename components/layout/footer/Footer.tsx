import React from "react";

import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <small className={classes.Container}>
      <div>
        <span>&copy;Institute of Registered Exercise Professionals.</span>
        <span>All rights reserved. 2014 - {new Date().getFullYear()}</span>
      </div>
      <a href="#">Powered by The Coding Pastor</a>
    </small>
  );
};

export default Footer;
