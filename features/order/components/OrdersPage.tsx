import { useState, useEffect } from "react";
import { BiRefresh } from "react-icons/bi";
import Button from "../../../components/form/Button";
import SearchDropDown from "../../../components/form/SearchDropDown";
import SearchInput from "../../../components/form/SearchInput";
import Spin from "../../../components/loaders/Spin";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import useAxiosProtected from "../../../hooks/useAxiosProtected";
import { GetOrders, GetTotalOrders, SearchOrders } from "../orderApi";
import { SelectOrder } from "../orderSlice";
import Order from "./Order";

import classes from "./OrdersPage.module.scss";
import Summary from "./Summary";

const OrdersPage: () => any = () => {
  const [DropdownValue, setDropdownValue] = useState("");
  const [Page, setPage] = useState(2);
  const [SearchTerm, setSearchTerm] = useState("");
  const [SearchMode, setSearchMode] = useState("search");
  const dispatch = useAppDispatch();
  useAxiosProtected();
  const { orderList, orderLoading, initialSearch, hasNext, total } =
    useAppSelector(SelectOrder);
  let isMounted = false;

  useEffect(() => {
    if (initialSearch && isMounted) {
      dispatch(GetOrders({ param: "default", page: 1 }));
      dispatch(GetTotalOrders());
    }

    return () => {
      isMounted = true;
    };
  }, []);

  const handleLoadMore = () => {
    if (!!SearchTerm.trim() && hasNext) {
      dispatch(
        SearchOrders({
          term: SearchTerm.trim(),
          page: Page,
        })
      ).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          setPage((prev) => prev + 1);
        }
      });
    } else {
      dispatch(
        GetOrders({ param: DropdownValue || "default", page: Page })
      ).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          setPage((prev) => prev + 1);
        }
      });
    }
  };

  let content: React.ReactNode;

  if (orderList.length === 0) content = <p>Orders unavailable.</p>;
  else if (["search", "default"].includes(orderLoading)) content = <Spin />;
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
      <div className={classes.Head}>
        <div
          style={{
            display: "flex",
            gap: "12rem",
          }}
        >
          <h1 className="Linez">Orders</h1>
          {orderLoading === "default" ? (
            <Spin style={{ marginLeft: "4rem", marginTop: "2rem" }} />
          ) : (
            <BiRefresh
              title="Get Latest Orders"
              onClick={() => {
                dispatch(GetOrders({ page: 1, param: "default" })).then(() => {
                  setSearchTerm("");
                  setDropdownValue("default");
                  setPage(2);
                });
                dispatch(GetTotalOrders());
              }}
            />
          )}
        </div>
        <Summary total={total} />
        <div style={{ display: "flex", gap: "2rem", maxWidth: "90%" }}>
          <Button
            text="Order by search"
            onClick={() => setSearchMode("search")}
            className={SearchMode === "search" ? classes.Active : ""}
          />
          <Button
            text="Order by query"
            onClick={() => setSearchMode("query")}
            className={SearchMode === "query" ? classes.Active : ""}
          />
        </div>
        <div className={classes.Search}>
          {SearchMode === "search" ? (
            <SearchInput
              setPage={setPage}
              searchTerm={SearchTerm}
              setSearchTerm={setSearchTerm}
            />
          ) : (
            <SearchDropDown
              value={DropdownValue}
              setValue={setDropdownValue}
              setPage={setPage}
              loading={orderLoading === "default"}
            />
          )}
        </div>
      </div>
      <div className={classes.Container}>
        <div className={classes.Inner}>{content}</div>
      </div>
      <div
        style={{
          marginTop: "3rem",
          marginBottom: "3rem",
          textAlign: "center",
        }}
      >
        {hasNext && !["search", "default"].includes(orderLoading) && (
          <>
            {orderLoading === "default" ? (
              <Spin />
            ) : (
              <Button
                type="button"
                text="Load More"
                mode="pry"
                onClick={handleLoadMore}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
