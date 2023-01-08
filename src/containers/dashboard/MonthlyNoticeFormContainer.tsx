import { FormEvent, useRef } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import {
  addNoticeAsync,
  deleteNoticeAsync,
  getNoticeAsync,
  noticeList,
} from "redux/dashboard/noticeSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import MonthlyNoticeForm from "components/dashboard/MonthlyNoticeForm";

interface Props {
  resetItemCountList: () => void;
}

const MonthlyNoticeFormContainer = ({ resetItemCountList }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);
  const list = useAppSelector(noticeList);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteNoticeAsync({ userUid, id })).unwrap();
      await dispatch(getNoticeAsync({ userUid })).unwrap();
      resetItemCountList();
    } catch {
      alert("공지사항 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const value = inputRef.current?.value as string;
      if (value === "") {
        alert("공지사항을 입력해주세요.");
        return;
      }
      const orderNumber: number = list.length + 1;
      await dispatch(
        addNoticeAsync({ userUid, content: value, orderNumber })
      ).unwrap();
      await dispatch(getNoticeAsync({ userUid })).unwrap();
      resetItemCountList(); //list 보여주기
    } catch {
      alert("공지 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    resetItemCountList(); //list 보여주기
  };

  return (
    <MonthlyNoticeForm
      noticeList={list}
      handleDelete={handleDelete}
      inputRef={inputRef}
      handleSumbit={handleSumbit}
      handleCancel={handleCancel}
    />
  );
};

export default MonthlyNoticeFormContainer;
