import classes from "./Video.module.scss";

const Video = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Inner}>
        <h3 className="Linez">Welcome to IREP</h3>
        <video
          src="https://res.cloudinary.com/indelible-success/video/upload/v1690069959/irep_uzr4ex.mp4"
          controls
        ></video>
      </div>
    </div>
  );
};

export default Video;
