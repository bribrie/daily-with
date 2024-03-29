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
import useFilter from "hooks/useFilter";
import FilterBar from "components/common/ui/FilterBar";
import Loading from "components/layout/Loading";
import AllSalesList from "components/sales/dailySales/AllSalesList";

const AllSalesListContainer = () => {
  const thisMonthList = useAppSelector(oneMonthSalesList);
  const allList = useAppSelector(allSalesList);
  const [itemCount, showAddForm, resetItemCount] = useItemCount("매출을");
  const filterData = ["이번달", "전체"];
  const [filterValue, handleFilterChange] = useFilter(filterData);
  const loading = useAppSelector(salesLoading);
  const userUid = useAppSelector(currentUserUid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filterValue === "전체" && allList.length === 0) {
      try {
        dispatch(getAllSalesAsync({ userUid })).unwrap();
      } catch {
        alert("모든 매출을 불러오지 못했습니다. 다시 시도해주세요.");
      }
    }
    if (filterValue === "이번달" && thisMonthList.length === 0) {
      try {
        dispatch(getOneMonthSalesAsync({ userUid })).unwrap();
      } catch {
        alert("모든 매출을 불러오지 못했습니다. 다시 시도해주세요.");
      }
    }
  }, [filterValue, userUid, dispatch, allList.length, thisMonthList.length]);

  //로딩
  if (loading === "pending") return <Loading type="sales" />;

  //이번달
  if (filterValue === "이번달") {
    return (
      <>
        <FilterBar
          filterData={filterData}
          filterValue={filterValue}
          handleFilterChange={handleFilterChange}
        />
        <AllSalesList
          allSalesList={thisMonthList}
          itemCount={itemCount}
          showAddForm={showAddForm}
          resetItemCount={resetItemCount}
          filterValue={filterValue}
        />
      </>
    );
  }

  //전체
  return (
    <>
      <FilterBar
        filterValue={filterValue}
        filterData={filterData}
        handleFilterChange={handleFilterChange}
      />
      <AllSalesList
        allSalesList={allList}
        itemCount={itemCount}
        showAddForm={showAddForm}
        resetItemCount={resetItemCount}
        filterValue={filterValue}
      />
    </>
  );
};

export default AllSalesListContainer;
