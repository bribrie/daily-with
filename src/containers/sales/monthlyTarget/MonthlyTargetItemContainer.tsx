import { useAppDispatch, useAppSelector } from "redux/hooks";
import { TargetListType } from "redux/sales/salesTypes";
import { currentUserUid } from "redux/auth/authSlice";
import {
  deleteTargetAsync,
  getTargetAsync,
} from "redux/sales/monthlyTarget/targetThunk";
import MonthlyTargetItem from "components/sales/monthlyTarget/MonthlyTargetItem";
import {
  modalId,
  modalOpen,
  modalSavedId,
  modalState,
} from "redux/common/modalSlice";

export interface TargetItemProps {
  targetItem: TargetListType;
}

const MonthlyTargetItemContainer = ({ targetItem }: TargetItemProps) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);
  const isModalOpen = useAppSelector(modalState);
  const deleteId = useAppSelector(modalId);

  const handleModalOpen = (id: string) => {
    dispatch(modalOpen());
    dispatch(modalSavedId(id));
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTargetAsync({ userUid, id: deleteId })).unwrap();
      await dispatch(getTargetAsync({ userUid })).unwrap();
    } catch {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <MonthlyTargetItem
      targetItem={targetItem}
      handleDelete={handleDelete}
      isModalOpen={isModalOpen}
      handleModalOpen={handleModalOpen}
    />
  );
};
export default MonthlyTargetItemContainer;
