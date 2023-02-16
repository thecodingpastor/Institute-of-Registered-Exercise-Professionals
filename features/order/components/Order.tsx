import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { SelectOrder } from "../orderSlice";
import { OrderType } from "../types";

import { __time } from "../../../utils/formatDate";

import ConfirmModal from "../../../components/modal/ConfirmModal";

import { AiFillDelete, AiOutlineEye } from "react-icons/ai";

import classes from "./Order.module.scss";
import { ChangeOrderStatus, DeleteOrder } from "../orderApi";
import OrderReceiptModal from "./OrderReceiptModal";

const Order: React.FC<OrderType> = ({
  _id,
  address,
  amount,
  country,
  course,
  createdAt,
  fullName,
  receipt,
  state,
  status,
  promoPercentage,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const { orderLoading } = useAppSelector(SelectOrder);
  const [ShowConfirm, setShowConfirm] = useState<
    "delete" | "status" | "receipt"
  >(null);

  return (
    <div className={classes.Container}>
      <h3>
        <span className={classes.Head}>Name:</span> {fullName}
      </h3>
      <h4>
        <span className={classes.Head}>Course:</span> {course}
      </h4>
      <h5>
        Address: {address} , {state}, {country}.
      </h5>
      <span
        onClick={() => setShowConfirm("status")}
        className={classes[status]}
      >
        {status}
      </span>
      <p>
        <b>Sales %: </b> {promoPercentage}% <b>Mode: </b> {mode}{" "}
      </p>
      <h2>₦ {amount}</h2>
      <small>{__time(createdAt)}</small>
      <div className={classes.SVGs}>
        <AiOutlineEye onClick={() => setShowConfirm("receipt")} />
        <AiFillDelete onClick={() => setShowConfirm("delete")} />
      </div>
      <ConfirmModal
        close={() => setShowConfirm(null)}
        isOpen={ShowConfirm === "delete"}
        loading={orderLoading === _id}
        closeButtonText="Delete Order"
        message="Are you sure you want to DELETE this order?"
        proceedWithAction={() => dispatch(DeleteOrder(_id))}
      />
      <ConfirmModal
        close={() => setShowConfirm(null)}
        isOpen={ShowConfirm === "status"}
        loading={orderLoading === _id + "status"}
        closeButtonText="Change Status"
        message={`Are you sure you want to ${
          status === "pending" ? "APPROVE" : "REDACT"
        } this order?`}
        proceedWithAction={() =>
          dispatch(ChangeOrderStatus({ orderId: _id, status })).then((data) => {
            if (data.meta.requestStatus === "fulfilled") {
              setShowConfirm(null);
            }
          })
        }
      />
      <OrderReceiptModal
        image={receipt.secure_url}
        isOpen={ShowConfirm === "receipt"}
        close={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default Order;
