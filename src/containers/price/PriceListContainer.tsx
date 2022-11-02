import { useEffect, useMemo } from "react";
import { getPriceAsync, priceLoading, priceList } from "redux/price/priceSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { PriceListType } from "redux/types";
import { currentUserUid } from "redux/auth/authSlice";
import Loading from "components/layout/Loading";
import PriceList from "components/price/PriceList";
import useSearch from "hooks/useSearch";

const PriceListContainer = () => {
  const list = useAppSelector(priceList);
  const uid = useAppSelector(currentUserUid);
  const loadingStatus = useAppSelector(priceLoading);
  const [searchValue, searchHandler, handleReset] = useSearch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (list.length === 0) {
      try {
        dispatch(getPriceAsync(uid)).unwrap();
      } catch {
        alert("이용권을 불러올 수 없습니다. 다시 시도해주세요.");
      }
    }
  }, [dispatch, list.length, uid]);

  //필터 리스트 기억
  const filteredList = useMemo(() => {
    return list.filter((data: PriceListType) =>
      data.title.toLowerCase().includes(searchValue)
    );
  }, [list, searchValue]);

  //Loading 중
  if (loadingStatus === "pending") return <Loading />;

  //검색어 없을 때
  if (searchValue === "") {
    return (
      <PriceList
        list={list}
        handleSearch={searchHandler}
        handleReset={handleReset}
      />
    );
  }
  //검색어 있을 때
  else {
    return (
      <PriceList
        list={filteredList}
        handleSearch={searchHandler}
        handleReset={handleReset}
      />
    );
  }
};

export default PriceListContainer;
