import { FormEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import {
  addSalesAsync,
  getOneMonthSalesAsync,
} from "redux/sales/dailySales/dailySalesThunk";
import {
  addSalesItemList,
  addSalesData,
  deleteSalesData,
} from "redux/sales/dailySales/dailySalesSlice";
import { AddSalesItemListType, SalesListType } from "redux/sales/salesTypes";
import useCurrency from "hooks/useCurrency";
import DailyForm from "components/sales/dailySales/DailyForm";

export interface FormProps {
  type: "today" | "all" | "edit";
  editData?: SalesListType;
  resetItemCount?: () => void;
  todaySalesList?: SalesListType[];
  allSalesList?: SalesListType[];
}

const DailyFormContainer = ({
  type,
  editData,
  resetItemCount,
  todaySalesList,
  allSalesList,
}: FormProps) => {
  const userUid = useAppSelector(currentUserUid);
  const dispatch = useAppDispatch();
  const dateRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const newRegisterRef = useRef<HTMLInputElement>(null);
  const reRegisterRef = useRef<HTMLInputElement>(null);
  const [totalSales, handleTotalSales] = useCurrency(
    editData ? editData.totalSales : "0"
  );
  const addedItemList = useAppSelector(addSalesItemList);
  const [count, setCount] = useState(0);

  console.log(
    "todaySalesList :",
    todaySalesList,
    "allSalesList : ",
    allSalesList
  );

  //* 서버보내기 전에 reducer state에 추가
  const addSalesItem = () => {
    const addData: AddSalesItemListType = {
      id: addedItemList.length + 1,
      date: dateRef.current?.value as string,
      type: typeRef.current?.value as string,
      newRegister: newRegisterRef.current?.valueAsNumber as number,
      reRegister: reRegisterRef.current?.valueAsNumber as number,
      totalSales,
    };

    //1-1. 오늘 매출이면 type같은게 있는지만 체크 => date는 오늘 날짜가 default이기 때문
    if (
      (type === "today" && addedItemList.length >= 1) ||
      (type === "today" && todaySalesList)
    ) {
      if (todaySalesList) {
        const al = todaySalesList.filter((el) => el.type === addData.type);
        if (al.length !== 0) {
          alert("중복");
          return;
        }
      }
      for (let el of addedItemList) {
        if (el.type === addData.type) {
          alert(`이미 등록된 ${el.type} 데이터가 있습니다. 수정해주세요.`);
          return;
        }
      }
    }
    //1-2. 이전 매출이면 type과 date 둘 다 확인해서 같은 데이터가 있는 지 확인
    if (type === "all" && addedItemList.length >= 1) {
      for (let el of addedItemList) {
        if (el.type === addData.type && el.date === addData.date) {
          console.log("Last if문 들어옴");
          alert(
            `이미 ${el.date}날짜의 등록된 ${el.type} 데이터가 있습니다. 수정해주세요.`
          );
          return;
        }
      }
    }
    dispatch(addSalesData(addData));
    setCount((count) => count + 1);
  };

  //* 서버보내기 전에 reducer통해 해당 아이템 삭제
  const deleteAddedItem = (id: number) => {
    dispatch(deleteSalesData(id));
    setCount((count) => count - 1);
  };

  //* 등록 버튼 누르면 서버로 데이터 저장
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const addData = {
        userUid,
        date: dateRef.current?.value as string,
        data: addedItemList,
      };
      await dispatch(addSalesAsync(addData)).unwrap();
      await dispatch(
        getOneMonthSalesAsync({ userUid: addData.userUid })
      ).unwrap();
      setCount(0);
      resetItemCount && resetItemCount();
    } catch {
      alert("매출 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
    } catch {
      alert("매출 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <DailyForm
      type={type}
      editData={editData}
      addedItemList={addedItemList}
      dateRef={dateRef}
      typeRef={typeRef}
      newRegisterRef={newRegisterRef}
      reRegisterRef={reRegisterRef}
      totalSales={totalSales}
      handleTotalSales={handleTotalSales}
      addSalesItem={addSalesItem}
      handleSubmit={handleSubmit}
      count={count}
      deleteAddedItem={deleteAddedItem}
      handleEditSubmit={handleEditSubmit}
    />
  );
};

export default DailyFormContainer;
