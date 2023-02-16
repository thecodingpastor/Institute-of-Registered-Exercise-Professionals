import { useEffect } from "react";
import AuthPageLoading from "../../../components/loaders/AuthPageLoading";
import Skeleton from "../../../components/loaders/Skeleton";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import useAxiosProtected from "../../../hooks/useAxiosProtected";
import { GetOrders } from "../orderApi";
import { SelectOrder } from "../orderSlice";
import Order from "./Order";

import classes from "./OrdersPage.module.scss";
const OrdersPage = () => {
  const dispatch = useAppDispatch();
  useAxiosProtected();
  const { orderList, orderLoading } = useAppSelector(SelectOrder);

  useEffect(() => {
    if (orderLoading === "loading") {
      dispatch(GetOrders());
    }
  }, []);

  if (orderList === "loading")
    // @ts-ignore
    return [...Array(10).keys()].map((i) => <Skeleton key={i} />);

  let content: React.ReactNode;

  if (orderList.length === 0) content = <p>There are no orders yet.</p>;
  else
    content = (
      <>
        {orderList.map((order) => (
          <Order key={order._id} {...order} />
        ))}
      </>
    );

  return (
    <>
      <h1
        className="Linez"
        style={{ textAlign: "center", margin: "3rem auto" }}
      >
        Orders
      </h1>
      <div className={classes.Container}>
        <div className={classes.Inner}>{content}</div>
      </div>
    </>
  );
};

export default OrdersPage;
