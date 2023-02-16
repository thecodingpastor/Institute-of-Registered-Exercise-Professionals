// import data from "../../pages/projects/data";

import Slide from "./Slide";

import classes from "./Slider.module.scss";

const Slider = () => {
  // let testImages = data[0].images;

  return (
    <section className={classes.Container} id="Slider">
      <h2>sLIDE TEST</h2>
      {/* {testImages.map((img, i) => (
        <Slide key={i} img={img} index={i} />
      ))} */}
    </section>
  );
};

export default Slider;
