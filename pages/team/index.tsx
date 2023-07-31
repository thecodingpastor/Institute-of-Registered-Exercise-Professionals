import Image from "next/image";
import React from "react";

import classes from "./Index.module.scss";
import Transition from "../../components/general/Transition";
import Head from "next/head";
import { PlaceholderURL } from "../../fetchConfig/store";

const data = [
  {
    name: "Joel Uzamere",
    image:
      "https://res.cloudinary.com/indelible-success/image/upload/v1690542789/irep/irepsiteassets/joel_yqyf0y.webp",
    role: "Chief Executive Officer",
    details: "B.Sc. Hons, Dip. Elec. & Comp Engr., CER, CPT, CGB, CMMAT",
  },
  {
    name: "Oludare V. Olayiwola",
    image:
      "https://res.cloudinary.com/indelible-success/image/upload/v1690542789/irep/irepsiteassets/oludare_mncjwl.webp",
    role: "Director of Training",
    details:
      "MSc Exercise Physiology, Liverpool John Moores University – Liverpool, UK",
  },
  {
    name: "Eunice Tolu",
    image:
      "https://res.cloudinary.com/indelible-success/image/upload/v1690542791/irep/irepsiteassets/tolu_rjcxve.webp",
    role: "Director of Programmes",
    details: "MSc Exercise Physiology, FIREP, CPT. Student Affairs Executive",
  },
  {
    name: "Oluwabusola Abiola",
    image:
      "https://res.cloudinary.com/indelible-success/image/upload/v1690542787/irep/irepsiteassets/busola_i2scla.webp",
    role: "Administrative Lead",
    details: "B.Sc. Hons., M.Sc. Int. Bus.",
  },
  {
    name: "Dare Joseph Akinfosile",
    image:
      "https://res.cloudinary.com/indelible-success/image/upload/v1690542787/irep/irepsiteassets/dareee_fatv3e.webp",
    role: "Continuous Professional Development Lead",
    details: "CFT, AISPoN, OSH/HSE Professional",
  },
];

const advisory = [
  {
    name: "Dr Mrs Ronke Eso",
    details: "B.Sc.PT, M.Ed, DPT, PhD Physiotherapy",
  },
  {
    name: "Dr Chuks Osanife",
    details: "MBBSchs, BAO, LRCP, FRCS, Dip Rad, Dip Tropical Med",
  },
  {
    name: "Dr Jack E. Mbom",
    details: "FIL, PhD Physiology",
  },
  {
    name: "Professor (Mrs) Folasade R. Sulaiman",
    details: "B.Ed. MCPP; M.Ed., Ph.D.",
  },
  {
    name: "Dr Alexis Batrakoulis",
    details:
      "PhD - Adjunct Lecturer, University of Thessaly. Founder, International Obesity Exercise Training Institute.",
  },
];

const TeamPage = () => {
  return (
    <Transition mode="scale-out" className={classes.Container}>
      <Head>
        <title>IREP Management Board</title>
      </Head>
      <h2 className="Linez text-center"> Management Board</h2>
      <section>
        {data.map((p, i) => (
          <div key={i} className={classes.Img}>
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="50vw"
              blurDataURL={PlaceholderURL}
              placeholder="blur"
            />
            <div className={classes.Details}>
              <h3>{p.name}</h3>
              <small>{p.details}</small>
              <small style={{ marginTop: ".5rem", fontWeight: "400" }}>
                {p.role}
              </small>
            </div>
          </div>
        ))}
      </section>

      <h2 className="Linez">Advisory Board</h2>
      {advisory.map((p, i) => (
        <div key={i} style={{ marginBottom: "2rem" }}>
          <h3>{p.name}</h3>
          <small>{p.details}</small>
        </div>
      ))}
    </Transition>
  );
};

export default TeamPage;
