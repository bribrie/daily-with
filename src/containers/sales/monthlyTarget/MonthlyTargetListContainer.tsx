import { useEffect, useState } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getTargetAsync } from "redux/sales/monthlyTarget/targetThunk";
import { TargetListType } from "redux/sales/salesTypes";
import {
  targetList,
  targetLoading,
} from "redux/sales/monthlyTarget/targetSlice";
import useFilter from "hooks/useFilter";
import Loading from "components/layout/Loading";
import MonthlyTargetList from "components/sales/monthlyTarget/MonthlyTargetList";

const MonthlyTargetListContainer = () => {
  const list = useAppSelector(targetList);
  const userUid = useAppSelector(currentUserUid);
  const [itemCountList, setItemCountList] = useState(0);
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

  const showAddTargetForm = () => {
    if (itemCountList >= 1) {
      alert("매출을 입력해주세요.");
      return;
    }
    setItemCountList((count) => count + 1);
  };

  const resetItemCountList = () => {
    setItemCountList(0);
  };

  if (loading === "pending") {
    return <Loading />;
  }

  if (filterValue === "전체") {
    return (
      <MonthlyTargetList
        targetList={list}
        itemCountList={itemCountList}
        showAddTargetForm={showAddTargetForm}
        resetItemCountList={resetItemCountList}
        filterData={filterData}
        handleFilterBar={handleFilterChange}
      />
    );
  }

  return (
    <MonthlyTargetList
      targetList={filteredList}
      itemCountList={itemCountList}
      showAddTargetForm={showAddTargetForm}
      resetItemCountList={resetItemCountList}
      filterData={filterData}
      handleFilterBar={handleFilterChange}
    />
  );
};

export default MonthlyTargetListContainer;
