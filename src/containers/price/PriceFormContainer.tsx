import { FormEvent, useState } from "react";
import useInput from "hooks/useInput";
import PriceForm from "components/price/PriceForm";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  addPriceAsync,
  getPriceAsync,
  priceLoading,
} from "redux/price/priceSlice";
import { currentUserUid } from "redux/auth/authSlice";
import useCurrency from "hooks/useCurrency";
import Loading from "components/layout/Loading";

const PriceFormContainer = () => {
  const [{ type, period, title, delay }, inputChange] = useInput({
    type: "헬스",
    period: "기간제",
    title: "",
    delay: "0",
  }); //defaultChecked를 initial로 세팅

  const [price, handlePrice] = useCurrency("");
  const [event, setEvent] = useState(false);
  const loading = useAppSelector(priceLoading);
  const userUid = useAppSelector(currentUserUid);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //DB에 저장
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const addData = {
        type,
        period,
        title,
        price,
        delay,
        userUid,
        event,
      };
      await dispatch(addPriceAsync(addData)).unwrap();
      await dispatch(getPriceAsync(userUid)).unwrap();
      navigate("/price");
    } catch {
      alert("새 이용권을 등록할 수 없습니다. 다시 시도해주세요.");
    }
  };

  const handleCheckEvent = () => {
    setEvent((event) => !event);
  };

  //Loading 중
  if (loading === "pending") return <Loading />;

  return (
    <PriceForm
      handleChange={inputChange}
      handlePrice={handlePrice}
      handleCheckEvent={handleCheckEvent}
      handleSubmit={handleSubmit}
      price={price}
    />
  );
};

export default PriceFormContainer;
