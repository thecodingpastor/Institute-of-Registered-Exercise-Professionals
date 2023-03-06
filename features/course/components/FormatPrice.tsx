import { CheckDate } from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";

import { FormatPricePropType } from "../types";

import classes from "./FormatPrice.module.scss";

const FormatPrice: React.FC<FormatPricePropType> = ({
  price,
  promoPercentage,
  status,
  showHidden,
  expiryDate,
  otherPrice,
}) => {
  return (
    <div className={classes.Container}>
      <h5>{status}</h5>
      {/* {price === 0 && } */}
      {price === 0 ? (
        status === "offline" ? (
          <p className={classes.Price} title="Not Available">
            N/A
          </p>
        ) : otherPrice === 0 ? (
          <p className={classes.Price}>Free</p>
        ) : (
          <p className={classes.Price} title="Not Available">
            N/A
          </p>
        )
      ) : (
        <div className={classes.DeletePrice}>
          {promoPercentage > 0 && CheckDate(expiryDate) && (
            <del className={!showHidden ? "Hide" : ""}>₦ {price}</del>
          )}
          <p className={classes.Price}>
            ₦
            {promoPercentage > 0 && CheckDate(expiryDate)
              ? formatPrice(price, promoPercentage)
              : price}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormatPrice;
