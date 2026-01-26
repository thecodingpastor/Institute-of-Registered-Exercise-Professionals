import React from "react";
import { ImLocation } from "react-icons/im";

import classes from "./Location.module.scss";
const Location = () => {
  return (
    <div className={classes.Container}>
      <ImLocation />
      <span>You can come in for more enquiry at </span>
      <p className="text-center">19, Ikorodu Road, Maryland, Lagos. Nigeria.</p>
    </div>
  );
};

export default Location;
