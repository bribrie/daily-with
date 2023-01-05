import { FormEvent, memo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import useCurrency from "hooks/useCurrency";
import MonthlyTargetForm from "components/sales/monthlyTarget/MonthlyTagetForm";
import {
  addTargetAsync,
  editTargetAsync,
  getTargetAsync,
} from "redux/sales/monthlyTarget/targetThunk";
import { TargetListType } from "redux/sales/salesTypes";
import { useNavigate } from "react-router-dom";

export interface TargetFormProps {
  editItem?: TargetListType;
  resetItemCountList?: () => void;
}

const MonthlyTargetFormContainer = ({
  editItem,
  resetItemCountList,
}: TargetFormProps) => {
  const monthRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const newRef = useRef<HTMLInputElement>(null);
  const reRegisterRef = useRef<HTMLInputElement>(null);
  const [totalSales, handleTotalSales] = useCurrency(
    `${editItem ? editItem.totalSales : "0"}`
  );
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);
  const navigate = useNavigate();

  //등록 버튼
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const targetData = {
        userUid,
        month: monthRef.current?.value as string,
        type: typeRef.current?.value as string,
        newTarget: newRef.current?.valueAsNumber as number,
        reRegisterTarget: reRegisterRef.current?.valueAsNumber as number,
        totalSales,
      };
      await dispatch(addTargetAsync(targetData)).unwrap();
      await dispatch(getTargetAsync({ userUid })).unwrap();
      resetItemCountList && resetItemCountList();
    } catch {
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  //수정 후 등록 버튼
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const editData = {
        userUid,
        id: editItem?.id as string,
        month: monthRef.current?.value as string,
        type: typeRef.current?.value as string,
        newTarget: newRef.current?.valueAsNumber as number,
        reRegisterTarget: reRegisterRef.current?.valueAsNumber as number,
        totalSales,
      };
      if (
        editItem &&
        editData.month === editItem.month &&
        editData.type === editItem.type &&
        editData.newTarget === editItem.newTarget &&
        editData.reRegisterTarget === editItem.reRegisterTarget &&
        editData.totalSales === editItem.totalSales
      ) {
        alert("수정된 내용이 없습니다.");
        return;
      }
      await dispatch(editTargetAsync(editData)).unwrap();
      await dispatch(getTargetAsync({ userUid })).unwrap();
      navigate("/sales/monthly-target");
    } catch {
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <MonthlyTargetForm
      monthRef={monthRef}
      typeRef={typeRef}
      newRef={newRef}
      reRegisterRef={reRegisterRef}
      totalSales={totalSales}
      handleTotalSales={handleTotalSales}
      handleSubmit={handleSubmit}
      editItem={editItem}
      handleEditSubmit={handleEditSubmit}
    />
  );
};

export default memo(MonthlyTargetFormContainer);
