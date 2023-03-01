import { useEffect } from "react";
import { GetOrders } from "../../features/order/orderApi";
import { useAppDispatch } from "../../fetchConfig/store";

import classes from "./SearchDropDown.module.scss";

const options = [
  { caption: "All Orders", value: "default" },
  { caption: "Paystack Orders", value: "paystack" },
  { caption: "Transfer Orders", value: "transfer" },
  { caption: "Pending Orders", value: "pending" },
  { caption: "Completed Orders", value: "completed" },
  { caption: "Free Orders", value: "free" },
];

const SearchDropDown = ({ value, setValue, setPage, loading }) => {
  useEffect(() => {
    return () => {
      setValue("");
    };
  }, []);
  const dispatch = useAppDispatch();

  return (
    <div className={classes.Container}>
      <div className={classes.Select}>
        <select
          name="search orders"
          onChange={(e) => {
            setValue(e.target.value);
            dispatch(GetOrders({ param: e.target.value, page: 1 })).then(
              (data) => {
                if (data.meta.requestStatus === "fulfilled") {
                  setPage(2);
                }
              }
            );
          }}
          value={value || "Choose Order Query"}
          disabled={loading}
        >
          <option disabled>Choose Order Query</option>
          {options.map((opt) => (
            <option key={opt.caption} value={opt.value}>
              {opt.caption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchDropDown;
