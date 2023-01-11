import { useEffect } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getTargetAsync } from "redux/sales/monthlyTarget/targetThunk";
import { TargetListType } from "redux/sales/salesTypes";
import {
  targetList,
  targetLoading,
} from "redux/sales/monthlyTarget/targetSlice";
import useFilter from "hooks/useFilter";
import useItemCount from "hooks/useItemCount";
import Loading from "components/layout/Loading";
import MonthlyTargetList from "components/sales/monthlyTarget/MonthlyTargetList";

const MonthlyTargetListContainer = () => {
  const list = useAppSelector(targetList);
  const userUid = useAppSelector(currentUserUid);
  const [itemCount, showAddForm, resetItemCount] = useItemCount("매출을");
  const dispatch = useAppDispatch();
  const loading = useAppSelector(targetLoading);
  const filterData = ["전체", "헬스", "PT", "필라테스"];
  const [filterValue, handleFilterChange] = useFilter(filterData);

  const filteredList = list.filter(
    (el: TargetListType) => el.type === filterValue
  );

  useEffect(() => {
    if (list.length === 0) {
      try {
        dispatch(getTargetAsync({ userUid })).unwrap();
      } catch {
        alert("목표 매출 데이터를 가져오지 못했습니다. 다시 시도해주세요.");
      }
    }
  }, [dispatch, list.length, userUid]);

  if (loading === "pending") return <Loading type="sales" />;

  if (filterValue === "전체") {
    return (
      <MonthlyTargetList
        targetList={list}
        itemCount={itemCount}
        showAddForm={showAddForm}
        resetItemCount={resetItemCount}
        filterData={filterData}
        handleFilterBar={handleFilterChange}
      />
    );
  }

  return (
    <MonthlyTargetList
      targetList={filteredList}
      itemCount={itemCount}
      showAddForm={showAddForm}
      resetItemCount={resetItemCount}
      filterData={filterData}
      handleFilterBar={handleFilterChange}
    />
  );
};

export default MonthlyTargetListContainer;
