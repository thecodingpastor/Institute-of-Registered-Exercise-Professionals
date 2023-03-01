import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
  FaLinkedin,
} from "react-icons/fa";

import classes from "./Socials.module.scss";
import Link from "next/link";

const Links = [
  {
    link: "https://www.instagram.com/irep_learning",
    icon: FaInstagramSquare,
  },
  {
    link: "https://www.facebook.com/IREPcourses",
    icon: FaFacebookSquare,
  },
  {
    link: "https://www.twitter.com/irep_learning",
    icon: FaTwitterSquare,
  },

  {
    link: "https://www.youtube.com/channel/UCtfulARReWKM81pbSoPAL1g/featured",
    icon: FaYoutubeSquare,
  },
  {
    link: "https://linkedin.com/in/inst-of-registered-exercise-professional-ng-7bb78198",
    icon: FaLinkedin,
  },
];

const Socials = () => {
  return (
    <div className={classes.Container}>
      {Links.map((link, i) => (
        <Link href={link.link} target="_blank" key={i}>
          <link.icon />
        </Link>
      ))}
    </div>
  );
};

export default Socials;
