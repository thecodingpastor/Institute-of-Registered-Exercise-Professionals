import Image from "next/image";
import React from "react";

import classes from "./Slide.module.scss";

import One from "../../assets/images/one.webp";
import Two from "../../assets/images/two.webp";
import Three from "../../assets/images/three.webp";
import Four from "../../assets/images/four.webp";

const images = [
  { img: One, title: "The Medical Rehabilitation Therapist Board of Nigeria" },
  { img: Two, title: "EREPS Life-long Learning" },
  { img: Three, title: "Europe Active" },
  { img: Four, title: "European Register of Exercise Professionals" },
];

const Slide = () => {
  return (
    <section className={classes.Container}>
      <h3>Institute Accreditation Bodies</h3>
      <ul className={classes.Moving}>
        {images.map((img, i) => (
          <li className={classes.Slide} key={i}>
            <Image src={img.img} alt={img.title} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Slide;
