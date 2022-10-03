import { ChangeEvent, FormEvent, useState } from "react";
import { formatCurrency } from "utilites/formatCurrency";
import useInput from "hooks/useInput";
import PriceForm from "components/price/PriceForm";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addPriceAsync, getPriceAsync } from "redux/price/priceSlice";
import { currentUserUid } from "redux/auth/authSlice";

const PriceFormContainer = () => {
  const [{ type, period, title, delay }, inputChange] = useInput({
    type: "헬스",
    period: "기간제",
    title: "",
    delay: "",
  }); //defaultChecked를 initial로 세팅
  const [price, setPrice] = useState("");
  const [event, setEvent] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //숫자 -> 원화로 보여주기
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const str: string = e.target.value.replace(/[^0-9]/g, "");
    const changedNum = Number(str);
    setPrice(formatCurrency(changedNum));
  };

  const userUid = useAppSelector(currentUserUid);
  const addPriceData = {
    type,
    period,
    title,
    price,
    delay,
    userUid,
    event,
  };

  //DB에 저장
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addPriceAsync(addPriceData));
      await dispatch(getPriceAsync(userUid));
      navigate("/price");
    } catch {
      //TODO: 에러 수정
      console.log("FAILED");
    }
  };

  const handleCheckEvent = () => {
    setEvent((event) => !event);
  };

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
