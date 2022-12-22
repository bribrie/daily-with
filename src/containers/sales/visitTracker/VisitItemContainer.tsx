import { VisitListType } from "redux/sales/salesTypes";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import {
  deleteVisitDataAsync,
  getAllVisitDataAsync,
  getOneMonthVisitDataAsync,
} from "redux/sales/visitTracker/visitThunk";
import {
  modalId,
  modalOpen,
  modalSavedId,
  modalState,
} from "redux/common/modalSlice";
import VisitItem from "components/sales/visitTracker/VisitItem";

export interface ItemProps {
  visitList: VisitListType;
  filterValue: string;
}

const VisitItemContainer = ({ visitList, filterValue }: ItemProps) => {
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
      await dispatch(deleteVisitDataAsync({ userUid, id: deleteId })).unwrap();
      if (filterValue === "전체") {
        await dispatch(getAllVisitDataAsync({ userUid })).unwrap();
      } else {
        await dispatch(getOneMonthVisitDataAsync({ userUid })).unwrap();
      }
    } catch {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <VisitItem
      visitList={visitList}
      isModalOpen={isModalOpen}
      handleModalOpen={handleModalOpen}
      handleDelete={handleDelete}
    />
  );
};

export default VisitItemContainer;
