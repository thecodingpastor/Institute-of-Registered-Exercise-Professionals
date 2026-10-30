import { useState } from "react";
import classes from "./Video.module.scss";

const Video = () => {
  const [play, setPlay] = useState(false);

  const videoId = "MFYhEHJ8lsw";

  return (
    <div className={classes.Container}>
      <div className={classes.Inner}>
        <h3 className="Linez">Welcome to IREP</h3>

        {!play ? (
          <div
            className={classes.Thumbnail}
            onClick={() => setPlay(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPlay(true);
              }
            }}
            aria-label="Play Welcome to IREP video"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Welcome to IREP video thumbnail"
            />

            <span className={classes.PlayButton}>▶</span>
          </div>
        ) : (
          <iframe
            // style={{
            //   display: "block",
            //   width: "100%",
            //   border: "2px solid red",
            //   minHeight: "400px",
            // }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Welcome to IREP"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default Video;
