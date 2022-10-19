import Loading from "components/layout/Loading";
import PriceEdit from "components/price/PriceEdit";
import useCurrency from "hooks/useCurrency";
import useInput from "hooks/useInput";
import { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  editPriceAsync,
  getPriceAsync,
  priceLoading,
  priceList,
} from "redux/price/priceSlice";

const PriceEditContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useAppSelector(priceList).filter((el) => el.id === id)[0];
  const [price, handlePrice] = useCurrency(`${data.price}`);
  const userUid = useAppSelector(currentUserUid);
  const loadingStatus = useAppSelector(priceLoading);

  const [{ type, period, title, delay, event }, inputChange] = useInput({
    type: `${data.type}`,
    period: `${data.period}`,
    title: `${data.title}`,
    delay: `${data.delay}`,
    event: `${data.event}`,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      type === data.type &&
      period === data.period &&
      title === data.title &&
      price === data.price &&
      delay === data.delay
    ) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    try {
      const editData = {
        id,
        type,
        period,
        title,
        price,
        delay,
        event: data.event,
        userUid,
      };
      await dispatch(editPriceAsync(editData)).unwrap();
      await dispatch(getPriceAsync(userUid)).unwrap();
      navigate("/price");
    } catch (err) {
      //수정할 이용권 없는 오류
      if (String(err).includes("No document to update")) {
        alert("수정할 이용권이 존재하지 않습니다.");
      }
      //나머지 오류
      else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };
  //Loading 중
  if (loadingStatus === "pending") return <Loading />;

  return (
    <PriceEdit
      type={type}
      period={period}
      title={title}
      price={price}
      delay={delay}
      event={event}
      handleChange={inputChange}
      handlePrice={handlePrice}
      handleSubmit={handleSubmit}
    />
  );
};

export default PriceEditContainer;
