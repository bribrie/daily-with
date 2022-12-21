import { FormEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  editMemberAsync,
  getMemberAsync,
  memberList,
  memberLoading,
} from "redux/member/memberSlice";
import { currentUserUid } from "redux/auth/authSlice";
import { ColorType } from "./MemberFormContainer";
import useInput from "hooks/useInput";
import MemberEdit from "components/member/MemberEdit";
import Loading from "components/layout/Loading";

const MemberEditContainer = () => {
  const { id } = useParams();
  const memberData = useAppSelector(memberList).filter((el) => el.id === id)[0];

  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const introductionRef = useRef<HTMLInputElement>(null);
  const [{ role, workDay }, handleChange] = useInput({
    role: `${memberData.role}`,
    workDay: `${memberData.workDay}`,
  });

  const colorList = [
    { color: "primary", checked: true },
    { color: "pink", checked: false },
    { color: "peach", checked: false },
    { color: "purple", checked: false },
    { color: "orange", checked: false },
    { color: "green", checked: false },
  ];

  const defaultColorList = colorList.map((el) => {
    return { ...el, checked: el.color === memberData.mainColor };
  });

  const [mainColor, setMainColor] = useState<ColorType[]>(defaultColorList);

  const userUid = useAppSelector(currentUserUid);
  const loading = useAppSelector(memberLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeColor = (e: any) => {
    console.log(e.target.id);
    const changed = mainColor.map((el) => {
      return { ...el, checked: el.color === e.target.id };
    });
    setMainColor(changed);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const editData = {
        userUid,
        id: id as string,
        name: nameRef.current?.value as string,
        contact: contactRef.current?.value as string,
        introduction: introductionRef.current?.value as string,
        workDay,
        role,
        startDate: startDateRef.current?.value as string,
        mainColor: mainColor.filter((el) => el.checked === true)[0].color,
      };

      await dispatch(editMemberAsync(editData)).unwrap();
      await dispatch(getMemberAsync({ userUid })).unwrap();
      navigate("/member");
    } catch {
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading === "pending") {
    return <Loading />;
  }

  return (
    <MemberEdit
      data={memberData}
      nameRef={nameRef}
      contactRef={contactRef}
      startDateRef={startDateRef}
      workDay={workDay}
      introductionRef={introductionRef}
      mainColor={mainColor}
      handleChange={handleChange}
      handleChangeColor={handleChangeColor}
      handleSubmit={handleSubmit}
    />
  );
};

export default MemberEditContainer;
