import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getPriceAsync, loading, priceList } from "redux/price/priceSlice";
import { useAppDispatch } from "redux/hooks";
import { useAppSelector } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import Loading from "components/layout/Loading";
import PriceList from "components/price/PriceList";

const PriceListContainer = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const list = useAppSelector(priceList);
  const uid = useAppSelector(currentUserUid);
  const loadingStatus = useAppSelector(loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getPriceAsync(uid));
    }
  }, [dispatch, list.length, uid]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTitle(value);
  }, []);

  //Loading 중
  if (loadingStatus === "pending") return <Loading />;

  //list 없을 때
  if (list.length === 0) {
    return <PriceList list={list} />;
  }

  //TODO: 수정해보기
  if (searchTitle === "") {
    return <PriceList list={list} handleSearch={handleSearch} />;
  } else {
    const filterList = list.filter((data) =>
      data.title.toLowerCase().includes(searchTitle)
    );
    return <PriceList list={filterList} handleSearch={handleSearch} />;
  }
};

export default PriceListContainer;
