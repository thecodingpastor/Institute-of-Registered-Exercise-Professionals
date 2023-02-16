import Image from "next/image";
import { useRouter } from "next/router";

import { BsFillArrowRightSquareFill } from "react-icons/bs";

import { CourseType } from "../types";

import classes from "./CourseCard.module.scss";
import FormatPrice from "./FormatPrice";

const CourseCard: React.FC<CourseType> = ({
  duration,
  image,
  onlinePrice,
  offlinePrice,
  promoPercentage,
  title,
  slug,
}) => {
  const { push } = useRouter();

  const PushToCourse = () => push("/course/" + slug);
  return (
    <div className={`${classes.Container} CourseCard`}>
      {promoPercentage > 0 && (
        <>
          <div className={classes.PromoPercentBackground}></div>
          <div className={classes.PromoPercent}>{promoPercentage}% OFF</div>
        </>
      )}
      <BsFillArrowRightSquareFill
        className={`${classes.More} Hide`}
        onClick={PushToCourse}
      />
      <div className={classes.Img}>
        <Image
          src={image?.secure_url ? image.secure_url : "/images/question.jpg"}
          alt={title}
          fill
          priority
          sizes="25%"
        />
      </div>
      <div className={classes.Content}>
        <div className={classes.Top}>
          <div className={classes.Offline}>
            <FormatPrice
              price={offlinePrice}
              promoPercentage={promoPercentage}
              status="Offline"
            />
          </div>
          <div className={classes.Online}>
            <FormatPrice
              price={onlinePrice}
              promoPercentage={promoPercentage}
              status="Online"
            />
          </div>
          <span className="Hide">{duration}</span>
        </div>
        <h3 onClick={PushToCourse}>{title}</h3>
      </div>
    </div>
  );
};

export default CourseCard;
