import { useEffect } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  visitLoading,
  oneMonthVisitList,
  allVisitList,
} from "redux/sales/visitTracker/visitSlice";
import {
  getAllVisitDataAsync,
  getOneMonthVisitDataAsync,
} from "redux/sales/visitTracker/visitThunk";
import useItemCount from "hooks/useItemCount";
import Loading from "components/layout/Loading";
import VisitList from "components/sales/visitTracker/VisitList";
import useFilter from "hooks/useFilter";
import FilterBar from "components/common/ui/FilterBar";

const VisitListContainer = () => {
  const thisMonthList = useAppSelector(oneMonthVisitList);
  const allList = useAppSelector(allVisitList);
  const [itemCount, showAddForm, resetItemCount] = useItemCount("방문 경로를");
  const filterData = ["이번달", "전체"];
  const [filterValue, handleFilterChange] = useFilter(filterData);
  const loading = useAppSelector(visitLoading);
  const userUid = useAppSelector(currentUserUid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (thisMonthList.length === 0) {
      dispatch(getOneMonthVisitDataAsync({ userUid }));
    }
    if (allList.length === 0) {
      dispatch(getAllVisitDataAsync({ userUid }));
    }
  }, [thisMonthList.length, allList.length, dispatch, userUid]);

  if (loading === "pending") <Loading type="sales" />;

  if (filterValue === "이번달") {
    return (
      <>
        <FilterBar filterData={filterData} selectedData={handleFilterChange} />
        <VisitList
          list={thisMonthList}
          itemCount={itemCount}
          showAddForm={showAddForm}
          resetItemCount={resetItemCount}
          filterValue={filterValue}
        />
      </>
    );
  }

  return (
    <>
      <FilterBar filterData={filterData} selectedData={handleFilterChange} />
      <VisitList
        list={allList}
        itemCount={itemCount}
        showAddForm={showAddForm}
        resetItemCount={resetItemCount}
        filterValue={filterValue}
      />
    </>
  );
};

export default VisitListContainer;
