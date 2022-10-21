import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  deletePriceAsync,
  getPriceAsync,
  priceLoading,
} from "redux/price/priceSlice";
import { PriceListType } from "redux/types";
import PriceItem from "components/price/PriceItem";
import Loading from "components/layout/Loading";
import { useState } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  //모달에서 확인 후 삭제진행
  const handleDelete = async () => {
    try {
      const deleteData = { userUid, id };
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
