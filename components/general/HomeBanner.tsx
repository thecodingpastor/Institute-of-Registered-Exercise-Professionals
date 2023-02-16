import Image from "next/image";

import classes from "./Banner.module.scss";

import BannerImage from "../../assets/images/banner-6.jpg";
const Banner = () => {
  return (
    <header className={classes.Container}>
      <section>
        <div className={classes.Inner}>
          <h2>Institute of Registered Exercise Professional</h2>
          <p>
            The first of its kind, this Institute was established with the help
            of Internationally recognized Fitness & Health Professionals to
            Train & Certify Exercise Professionals as well as accredit Gym
            facilities in Nigeria. It is Europe Active Accredited.
          </p>
        </div>
      </section>
      <Image src={BannerImage} alt="Banner" />
    </header>

    // <header className={classes.Container}>
    //   <article>
    //     <h2>Institute of Registered Exercise Professionals</h2>
    //     <p>
    //       The first of its kind, this Institute was established with the help of
    //       Internationally recognized Fitness & Health Professionals to Train &
    //       Certify Exercise Professionals as well as accredit Gym facilities in
    //       Nigeria. It is Europe Active Accredited.
    //     </p>
    //   </article>
    //   <Image src={BannerImage} alt="Banner" />
    // </header>
  );
};

export default Banner;
