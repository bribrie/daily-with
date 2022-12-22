import { FormEvent, useRef } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import {
  addVisitDataAsync,
  editVisitDataAsync,
  getAllVisitDataAsync,
  getOneMonthVisitDataAsync,
} from "redux/sales/visitTracker/visitThunk";
import {
  AddVisitReq,
  EditVisitReq,
  VisitListType,
} from "redux/sales/salesTypes";
import { useNavigate } from "react-router-dom";
import VisitForm from "components/sales/visitTracker/VisitForm";

export interface VisitFormProps {
  editItem?: VisitListType;
  resetItemCount?: () => void;
  filterValue?: string;
}

const VisitFormContainer = ({
  editItem,
  resetItemCount,
  filterValue,
}: VisitFormProps) => {
  const dateRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const offlineRef = useRef<HTMLInputElement>(null);
  const onlineRef = useRef<HTMLInputElement>(null);
  const friendRef = useRef<HTMLInputElement>(null);
  const telInRef = useRef<HTMLInputElement>(null);
  const naverInRef = useRef<HTMLInputElement>(null);
  const kakaoInRef = useRef<HTMLInputElement>(null);
  const totalVisitRef = useRef<HTMLInputElement>(null);
  const registerVisitRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);
  const navigate = useNavigate();

  const handleAddVisitItem = async (e: FormEvent) => {
    e.preventDefault();
    const addData: AddVisitReq = {
      userUid,
      date: dateRef.current?.value as string,
      type: typeRef.current?.value as string,
      offline: offlineRef.current?.valueAsNumber as number,
      online: onlineRef.current?.valueAsNumber as number,
      friend: friendRef.current?.valueAsNumber as number,
      telIn: telInRef.current?.valueAsNumber as number,
      naverIn: naverInRef.current?.valueAsNumber as number,
      kakaoIn: kakaoInRef.current?.valueAsNumber as number,
      totalVisit: totalVisitRef.current?.valueAsNumber as number,
      registerVisit: registerVisitRef.current?.valueAsNumber as number,
    };

    try {
      const sum =
        addData.offline +
        addData.online +
        addData.friend +
        addData.telIn +
        addData.naverIn +
        addData.kakaoIn;
      if (sum !== addData.totalVisit) {
        alert(
          "총 방문수와 방문 경로 입력 수가 맞지 않습니다. 다시 시도해주세요."
        );
        return;
      }
      await dispatch(addVisitDataAsync(addData)).unwrap();
      if (filterValue === "전체") {
        await dispatch(getAllVisitDataAsync({ userUid })).unwrap();
      } else {
        await dispatch(getOneMonthVisitDataAsync({ userUid })).unwrap();
      }
      resetItemCount && resetItemCount();
    } catch {
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEditVisitItem = async (e: FormEvent) => {
    e.preventDefault();
    const editData: EditVisitReq = {
      userUid,
      id: editItem?.id as string,
      date: dateRef.current?.value as string,
      type: typeRef.current?.value as string,
      offline: offlineRef.current?.valueAsNumber as number,
      online: onlineRef.current?.valueAsNumber as number,
      friend: friendRef.current?.valueAsNumber as number,
      telIn: telInRef.current?.valueAsNumber as number,
      naverIn: naverInRef.current?.valueAsNumber as number,
      kakaoIn: kakaoInRef.current?.valueAsNumber as number,
      totalVisit: totalVisitRef.current?.valueAsNumber as number,
      registerVisit: registerVisitRef.current?.valueAsNumber as number,
    };

    try {
      const sum =
        editData.offline +
        editData.online +
        editData.friend +
        editData.telIn +
        editData.naverIn +
        editData.kakaoIn;
      if (sum !== editData.totalVisit) {
        alert(
          "총 방문수와 방문경로 입력 수가 맞지 않습니다. 다시 시도해주세요."
        );
        return;
      }
      await dispatch(editVisitDataAsync(editData)).unwrap();
      await dispatch(getOneMonthVisitDataAsync({ userUid })).unwrap();
      navigate("/sales/visit-tracker");
    } catch {
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <VisitForm
      dateRef={dateRef}
      typeRef={typeRef}
      offlineRef={offlineRef}
      onlineRef={onlineRef}
      friendRef={friendRef}
      telInRef={telInRef}
      naverInRef={naverInRef}
      kakaoInRef={kakaoInRef}
      totalVisitRef={totalVisitRef}
      registerVisitRef={registerVisitRef}
      editItem={editItem}
      handleAddVisitItem={handleAddVisitItem}
      handleEditVisitItem={handleEditVisitItem}
    />
  );
};

export default VisitFormContainer;
