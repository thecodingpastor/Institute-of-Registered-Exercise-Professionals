import Image from "next/image";
import { useRouter } from "next/router";

import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { CheckDate } from "../../../utils/formatDate";

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
  announcement,
}) => {
  const { push } = useRouter();

  const PushToCourse = () => push("/course/" + slug);
  return (
    <div className={`${classes.Container} CourseCard`}>
      {promoPercentage > 0 && CheckDate(announcement?.date) && (
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
          blurDataURL="/images/loading.gif"
          placeholder="blur"
        />
      </div>
      <div className={classes.Content}>
        <div className={classes.Top}>
          <div className={classes.Offline}>
            <FormatPrice
              price={offlinePrice}
              promoPercentage={promoPercentage}
              status="offline"
              expiryDate={announcement?.date}
            />
          </div>
          <div className={classes.Online}>
            <FormatPrice
              price={onlinePrice}
              promoPercentage={promoPercentage}
              status="online"
              expiryDate={announcement?.date}
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
