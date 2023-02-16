import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProjectImagesType } from "../../features/Project/type";

import classes from "./Swiper.module.scss";

interface IProps {
  images: ProjectImagesType[];
}

const Index: React.FC<IProps> = ({ images }) => {
  const [IsDragging, setIsDragging] = useState(false);

  return (
    <div className={classes.Container}>
      <Swiper
        spaceBetween={10}
        // slidesPerView={1}
        // onSlideChange={() => console.log("slide changingggggggggg")}
        // onSwiper={(swiper) => console.log(swiper)}
        grabCursor={true}
      >
        {images.map((img) => (
          <SwiperSlide
            key={img.public_id}
            // Prevents unnecessary pop ups on desktop
            onContextMenu={(e) => e.preventDefault()}
            // Touch for mobile
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            // Mouse for desktop
            onMouseMove={() => {
              if (!IsDragging) setIsDragging(true);
            }}
            onMouseLeave={() => setIsDragging(false)}
          >
            {({ isActive }) => {
              return (
                <img
                  src={img.secure_url}
                  alt="Snapshots of my work"
                  className={IsDragging && isActive ? classes.Active : ""}
                />
              );
            }}
            {/* <img src={img} alt="Snapshots of my work" /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Index;
