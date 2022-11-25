import { useEffect, useState } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getTargetAsync } from "redux/sales/salesThunk";
import { salesLoading, targetList } from "redux/sales/salesSlice";
import Loading from "components/layout/Loading";
import MonthlyTargetList from "components/sales/monthlyTarget/MonthlyTargetList";

const MonthlyTargetListContainer = () => {
  const list = useAppSelector(targetList);
  const userUid = useAppSelector(currentUserUid);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [itemCountList, setItemCountList] = useState(0);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(salesLoading);

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

  const changeEditMode = (id: string) => {
    setIsEdit((isEdit) => !isEdit);
    setItemCountList(0);
    setEditId(id);
  };

  const resetEditMode = () => {
    setIsEdit(false);
  };

  if (loading === "pending") {
    return <Loading />;
  }

  return (
    <MonthlyTargetList
      targetList={list}
      itemCountList={itemCountList}
      showAddTargetForm={showAddTargetForm}
      resetItemCountList={resetItemCountList}
      isEdit={isEdit}
      editId={editId}
      changeEditMode={changeEditMode}
      resetEditMode={resetEditMode}
    />
  );
};

export default MonthlyTargetListContainer;
