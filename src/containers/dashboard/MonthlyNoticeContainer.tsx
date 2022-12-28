import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUserUid } from "redux/auth/authSlice";
import {
  getNoticeAsync,
  noticeList,
  updateOrderNumberAsync,
} from "redux/dashboard/noticeSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { NoticeListType } from "redux/types";
import useItemCount from "hooks/useItemCount";
import MonthlyNotice from "components/dashboard/MonthlyNotice";
import MonthlyNoticeFormContainer from "./MonthlyNoticeFormContainer";

const MonthlyNoticeContainer = () => {
  const list = useSelector(noticeList);
  const userUid = useAppSelector(currentUserUid);
  const [itemCount, showAddForm, resetItemCountList] =
    useItemCount("공지사항을");
  const [dragChagnedList, setDragChagnedList] =
    useState<NoticeListType[]>(list);
  const [showSavedButton, setShowSavedButton] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (list.length === 0) {
      try {
        dispatch(getNoticeAsync({ userUid })).unwrap();
      } catch {
        alert("공지사항 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.");
      }
    }
  }, [list.length, userUid, dispatch]);

  const handleDragChange = (result: any) => {
    if (!result.destination) return;
    // console.log(result);
    //drag하는 아이템이 source, destination은 내가 끌어다 놓은 도착 위치
    const items = [...dragChagnedList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDragChagnedList(items);
    setShowSavedButton(true); //순서 바뀐 아이템이 있으면 저장하기 버튼 보여줌
  };

  const handleUpdateOrderNumber = async () => {
    try {
      for (let i = 0; i < dragChagnedList.length; i++) {
        if (dragChagnedList[i].content !== list[i].content) {
          //순서 바뀐 아이템만 업데이트함
          await dispatch(
            updateOrderNumberAsync({
              userUid,
              id: dragChagnedList[i].id,
              orderNumber: i + 1,
            })
          ).unwrap();
        }
      }
      await dispatch(getNoticeAsync({ userUid })).unwrap();
      setShowSavedButton(false);
    } catch {
      alert("수정된 내용을 저장하는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    setDragChagnedList([]);
    setShowSavedButton(false);
  };

  if (itemCount === 1) {
    return (
      <MonthlyNoticeFormContainer resetItemCountList={resetItemCountList} />
    );
  }

  if (dragChagnedList.length === 0) {
    return (
      <MonthlyNotice
        noticeList={list}
        showAddForm={showAddForm}
        handleDragChange={handleDragChange}
        showSavedButton={showSavedButton}
        handleUpdateOrderNumber={handleUpdateOrderNumber}
      />
    );
  }

  return (
    <MonthlyNotice
      noticeList={dragChagnedList}
      showAddForm={showAddForm}
      handleDragChange={handleDragChange}
      showSavedButton={showSavedButton}
      handleUpdateOrderNumber={handleUpdateOrderNumber}
      handleCancel={handleCancel}
    />
  );
};

export default MonthlyNoticeContainer;
