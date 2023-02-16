import React from "react";
import Transition from "../../components/general/Transition";
import OrdersPage from "../../features/order/components/OrdersPage";

const SalesPage = () => {
  return (
    <Transition mode="scale-in">
      <OrdersPage />
    </Transition>
  );
};

export default SalesPage;
