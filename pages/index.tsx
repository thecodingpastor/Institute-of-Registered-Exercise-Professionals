import type { NextPage } from "next";
import Link from "next/link";
import HomeBanner from "../components/general/HomeBanner";

import Transition from "../components/general/Transition";
import Slide from "../components/home/Slide";
import Socials from "../components/home/Socials";
import Video from "../components/home/Video";

const Home: NextPage = () => {
  return (
    <Transition mode="scale-out">
      <HomeBanner />
      <div style={{ margin: "2rem" }}>
        <h3 className="Linez" style={{ fontSize: "2.5rem", fontWeight: "300" }}>
          Why Train With Us
        </h3>
        <p>
          An IREP certification solidifies your commitment to reach an
          industry-recognized standard, providing enhanced credibility and the
          opportunity to educate, motivate, inspire and train others to live
          healthier, happier lives. With careful preparation, and successful
          passing of our IREP accredited certification courses, you will be well
          on your way to launching a promising career and feel secure knowing
          you’re backed by an industry leader! As the largest certification,
          education and training organization in West Africa, we provide the
          tools you need to build and sustain a strong future and enjoy the
          benefits of being a certified, qualified and successful fitness
          professional. Our knowledgeable tutors of practicing fitness
          professionals are here to serve and guide you from the beginning of
          your career through being a seasoned pro. We invite you to join our
          team of professionals as we look forward to working with you
          throughout your career and arming you with the unparalleled education,
          knowledge, and professional skills needed to be a season fitness
          expert. Together we can enrich the lives of millions of individuals
          through fitness.{" "}
          <Link
            href="/course"
            className="Pulse"
            style={{
              padding: ".2rem 1rem",
              border: "2px solid #fccb0a",
              borderRadius: "1rem",
              fontSize: "2rem",
              whiteSpace: "nowrap",
            }}
          >
            Register with us today!
          </Link>
        </p>
      </div>
      <Video />
      <Slide />
      <Socials />
    </Transition>
  );
};

export default Home;
