import formatPrice from "../../../utils/formatPrice";

import { FormatPricePropType } from "../types";

import classes from "./FormatPrice.module.scss";

const FormatPrice: React.FC<FormatPricePropType> = ({
  price,
  promoPercentage,
  status,
  showHidden,
}) => {
  return (
    <div className={classes.Container}>
      <h5>{status}</h5>
      {price === 0 ? (
        status === "Offline" ? (
          <p className={classes.Price} title="Not Available">
            N/A
          </p>
        ) : (
          <p className={classes.Price}>Free</p>
        )
      ) : (
        <div className={classes.DeletePrice}>
          {promoPercentage > 0 && (
            <del className={!showHidden ? "Hide" : ""}>₦ {price}</del>
          )}
          <p className={classes.Price}>
            ₦{promoPercentage > 0 ? formatPrice(price, promoPercentage) : price}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormatPrice;
