import { CheckDate } from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";

const CalculatePrice = (
  price: number,
  otherPrice: number,
  percentage: number,
  // status: "online" | "offline",
  date: Date
) => {
  if (price === 0 && otherPrice === 0) return "Free";
  else if (price === 0) return "N/A";
  else {
    if (percentage > 0 && CheckDate(date))
      return formatPrice(price, percentage);
    else return price;
  }
  // if (price === 0) {
  //   if (status === "offline") return "N/A";
  //   else return "Free";
  // } else {
  //   if (percentage > 0 && CheckDate(date))
  //     return formatPrice(price, percentage);
  //   else return price;
  // }
};

export default CalculatePrice;
