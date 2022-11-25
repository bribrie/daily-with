import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import { deleteTargetAsync, getTargetAsync } from "redux/sales/salesThunk";
import MonthlyTargetItem from "components/sales/monthlyTarget/MonthlyTargetItem";

export interface TargetItemProps {
  id: string;
  month: string;
  type: string;
  newTarget: number;
  reRegisterTarget: number;
  totalSales: string;
  changeEditMode: (id: string) => void;
}

const MonthlyTargetItemContainer = ({
  id,
  month,
  type,
  newTarget,
  reRegisterTarget,
  totalSales,
  changeEditMode,
}: TargetItemProps) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTargetAsync({ userUid, id })).unwrap();
      await dispatch(getTargetAsync({ userUid })).unwrap();
    } catch {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <MonthlyTargetItem
      id={id}
      month={month}
      type={type}
      newTarget={newTarget}
      reRegisterTarget={reRegisterTarget}
      totalSales={totalSales}
      changeEditMode={changeEditMode}
      handleDelete={handleDelete}
    />
  );
};
export default MonthlyTargetItemContainer;
