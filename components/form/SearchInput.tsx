import { useEffect } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { SearchOrders } from "../../features/order/orderApi";
import { AddAlertMessage } from "../../features/UI/UISlice";
import { useAppDispatch } from "../../fetchConfig/store";

import classes from "./SearchInput.module.scss";

const SearchInput = ({ setPage, searchTerm, setSearchTerm }) => {
  useEffect(() => {
    return () => {
      setSearchTerm("");
    };
  }, []);
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (searchTerm.trim().length < 3)
      return dispatch(
        AddAlertMessage({
          message: "Search term cannot be less than 3 characters",
        })
      );
    dispatch(SearchOrders({ term: searchTerm, page: 1 })).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        setPage(2);
      }
    });
  };

  return (
    <div className={classes.Container}>
      <input
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        value={searchTerm}
        placeholder="Search orders"
      />
      <AiOutlineSearch onClick={handleSearch} />
    </div>
  );
};

export default SearchInput;
