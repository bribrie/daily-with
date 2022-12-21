import { VisitListType } from "redux/sales/salesTypes";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import {
  deleteVisitDataAsync,
  getOneMonthVisitDataAsync,
} from "redux/sales/visitTracker/visitThunk";
import { modalOpen, modalState } from "redux/common/modalSlice";
import VisitItem from "components/sales/visitTracker/VisitItem";

export interface ItemProps {
  visitList: VisitListType;
}

const VisitItemContainer = ({ visitList }: ItemProps) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);
  const isModalOpen = useAppSelector(modalState);

  const handleModalOpen = () => {
    dispatch(modalOpen());
  };

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteVisitDataAsync({ userUid, id: visitList.id })
      ).unwrap();
      await dispatch(getOneMonthVisitDataAsync({ userUid })).unwrap();
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
