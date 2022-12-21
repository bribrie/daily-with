import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  addMemberAsync,
  getMemberAsync,
  memberLoading,
} from "redux/member/memberSlice";
import { useNavigate } from "react-router-dom";
import useInput from "hooks/useInput";
import MemberForm from "components/member/MemberForm";
import Loading from "components/layout/Loading";

export interface ColorType {
  color: string;
  checked: boolean;
}

const MemberFormContainer = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const introductionRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const [{ workDay }, handleChange] = useInput({
    workDay: "월-금",
  });
  const [imageFiles, setImageFiles] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [mainColor, setMainColor] = useState<ColorType[]>([
    { color: "primary", checked: true },
    { color: "pink", checked: false },
    { color: "peach", checked: false },
    { color: "purple", checked: false },
    { color: "orange", checked: false },
    { color: "green", checked: false },
  ]);

  const userUid = useAppSelector(currentUserUid);
  const loading = useAppSelector(memberLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeColor = (e: any) => {
    const changed = mainColor.map((el) => {
      return { ...el, checked: el.color === e.target.id };
    });
    setMainColor(changed);
  };

  //file 있을 때 read함
  const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.length) {
      if (files[0].size > 1024 ** 2) {
        alert(
          "1MB 이하 파일만 등록할 수 있습니다. 현재파일 용량 : " +
            Math.round((files[0].size / 1024 / 1024) * 100) / 100 +
            "MB"
        );
        return;
      }
      readImageUrl(files[0]);
      setImageFiles(files[0]);
    }
  };

  const readImageUrl = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      result && setImageUrl(result as string);
    };
    file && reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const addMemberData = {
        userUid,
        name: nameRef.current?.value as string,
        contact: contactRef.current?.value as string,
        introduction: introductionRef.current?.value as string,
        image: imageFiles,
        workDay,
        role: roleRef.current?.value as string,
        startDate: startDateRef.current?.value as string,
        mainColor: mainColor.filter((el) => el.checked === true)[0].color,
      };

      await dispatch(addMemberAsync(addMemberData)).unwrap();
      await dispatch(getMemberAsync({ userUid })).unwrap();
      navigate("/member");
    } catch {
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading === "pending") {
    return <Loading />;
  }

  return (
    <MemberForm
      nameRef={nameRef}
      roleRef={roleRef}
      contactRef={contactRef}
      startDateRef={startDateRef}
      workDay={workDay}
      introductionRef={introductionRef}
      imageUrl={imageUrl}
      mainColor={mainColor}
      handleProfileImage={handleProfileImage}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleChangeColor={handleChangeColor}
    />
  );
};

export default MemberFormContainer;
