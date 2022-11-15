import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addMemberAsync, getMemberAsync } from "redux/member/memberSlice";
import { useNavigate } from "react-router-dom";
import useInput from "hooks/useInput";
import MemberForm from "components/member/MemberForm";

const MemberFormContainer = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const introductionRef = useRef<HTMLInputElement>(null);
  const [{ role, workDay }, handleChange] = useInput({
    role: "점장",
    workDay: "월-금",
  });

  const [imageFiles, setImageFiles] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const userUid = useAppSelector(currentUserUid);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //file 있을 때 read함
  const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.length) {
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
        role,
      };
      await dispatch(addMemberAsync(addMemberData)).unwrap();
      await dispatch(getMemberAsync({ userUid })).unwrap();
      navigate("/member");
    } catch {
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <MemberForm
      nameRef={nameRef}
      contactRef={contactRef}
      workDay={workDay}
      introductionRef={introductionRef}
      imageUrl={imageUrl}
      handleProfileImage={handleProfileImage}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default MemberFormContainer;
