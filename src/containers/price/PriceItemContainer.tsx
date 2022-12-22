import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  deletePriceAsync,
  getPriceAsync,
  priceLoading,
} from "redux/price/priceSlice";
import {
  modalId,
  modalOpen,
  modalSavedId,
  modalState,
} from "redux/common/modalSlice";
import { PriceListType } from "redux/types";
import Loading from "components/layout/Loading";
import PriceItem from "components/price/PriceItem";

const PriceItemContainer = ({
  id,
  type,
  period,
  title,
  price,
  delay,
  event,
}: PriceListType) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);
  const loadingStatus = useAppSelector(priceLoading);
  const isModalOpen = useAppSelector(modalState);
  const deleteId = useAppSelector(modalId);

  const handleModalOpen = (id: string) => {
    dispatch(modalSavedId(id));
    dispatch(modalOpen());
  };

  //모달에서 확인 후 삭제진행
  const handleDelete = async () => {
    try {
      const deleteData = { userUid, id: deleteId };
      await dispatch(deletePriceAsync(deleteData)).unwrap();
      await dispatch(getPriceAsync(userUid)).unwrap();
    } catch {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  //Loading 중
  if (loadingStatus === "pending") return <Loading />;

  return (
    <PriceItem
      id={id}
      type={type}
      period={period}
      title={title}
      price={price}
      delay={delay}
      event={event}
      handleDelete={handleDelete}
      handleModalOpen={handleModalOpen}
      isModalOpen={isModalOpen}
    />
  );
};

export default PriceItemContainer;
