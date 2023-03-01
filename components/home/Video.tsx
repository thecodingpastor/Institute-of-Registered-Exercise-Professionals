import classes from "./Video.module.scss";

const Video = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Inner}>
        <h3 className="Linez">Welcome to IREP</h3>
        <video
          src="https://res.cloudinary.com/indelible-success/video/upload/v1677009564/irep/irep1_bcd445.mp4"
          controls
        ></video>
      </div>
    </div>
  );
};

export default Video;
