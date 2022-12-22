import { useEffect } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getAllSalesAsync,
  getOneMonthSalesAsync,
} from "redux/sales/dailySales/dailySalesThunk";
import {
  allSalesList,
  oneMonthSalesList,
  salesLoading,
} from "redux/sales/dailySales/dailySalesSlice";
import useItemCount from "hooks/useItemCount";
import AllSalesList from "components/sales/dailySales/AllSalesList";
import Loading from "components/layout/Loading";
import useFilter from "hooks/useFilter";

const AllSalesListContainer = () => {
  const thisMonthList = useAppSelector(oneMonthSalesList);
  const allList = useAppSelector(allSalesList);
  const [itemCount, showAddForm, resetItemCount] = useItemCount("매출을");
  const userUid = useAppSelector(currentUserUid);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(salesLoading);
  const filterData = ["이번달", "전체"];
  const [filterValue, handleFilterChange] = useFilter(filterData);

  useEffect(() => {
    if (allList.length === 0) {
      try {
        dispatch(getAllSalesAsync({ userUid })).unwrap();
      } catch {
        alert("모든 매출을 불러오지 못했습니다. 다시 시도해주세요.");
      }
    }
    if (thisMonthList.length === 0) {
      try {
        dispatch(getOneMonthSalesAsync({ userUid })).unwrap();
      } catch {
        alert("모든 매출을 불러오지 못했습니다. 다시 시도해주세요.");
      }
    }
  }, [userUid, dispatch, allList.length, thisMonthList.length]);

  if (loading === "pending") return <Loading />;

  if (filterValue === "이번달") {
    return (
      <AllSalesList
        allSalesList={thisMonthList}
        itemCount={itemCount}
        showAddForm={showAddForm}
        resetItemCount={resetItemCount}
        filterData={filterData}
        handleFilterChange={handleFilterChange}
      />
    );
  }

  return (
    <AllSalesList
      allSalesList={allList}
      itemCount={itemCount}
      showAddForm={showAddForm}
      resetItemCount={resetItemCount}
      filterData={filterData}
      handleFilterChange={handleFilterChange}
    />
  );
};

export default AllSalesListContainer;
