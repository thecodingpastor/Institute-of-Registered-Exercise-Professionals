import type { NextPage } from "next";
import { InstagramEmbed } from "react-social-media-embed";
import HomeBanner from "../components/general/HomeBanner";

import Transition from "../components/general/Transition";

import classes from "./Index.module.scss";

const Home: NextPage = () => {
  return (
    <Transition mode="scale-in" className={classes.Container}>
      <HomeBanner />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut nemo enim
        animi voluptate, reiciendis, laudantium asperiores, nisi nobis a tenetur
        ab eius ad nulla ut voluptates praesentium perspiciatis itaque
        quibusdam!
      </p>
      {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
      {/* <InstagramEmbed
        height={"80px"}
        url="https://www.instagram.com/p/CnZzFGthV1F/"
        // min-width="80px"
      /> */}
      {/* </div> */}
      {/* <InstagramEmbed
        url="https://instagr.am/p/CnZzFGthV1F/"
        // appID | clientToken
        clientAccessToken="1406218616781071|290e21aa7ecbd72b3340b62b2b28f693"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      /> */}
    </Transition>
  );
};

export default Home;
