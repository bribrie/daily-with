import SignUpForm from "components/auth/SignUpForm";
import Loading from "components/layout/Loading";
import useInput from "hooks/useInput";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loading, signUpAsync } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const SignUpContainer = () => {
  const [{ email, password, centerName }, handleChange] = useInput({
    email: "",
    password: "",
    centerName: "",
  });
  const signUpUser = { email, password, centerName };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingStatus = useAppSelector(loading);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //TODO: alert 수정
    if (email.length < 6 || password.length < 6) {
      alert("6글자 이상 입력하세요.");
    }

    try {
      await dispatch(signUpAsync(signUpUser)).unwrap();
      navigate("/");
    } catch (err: any) {
      //TODO: 에러처리
      if (err.includes("email-already-in-use")) {
        alert("이미 존재하는 회원입니다.");
      } else {
        alert(err);
      }
    }
  };

  //로딩
  if (loadingStatus === "pending") {
    return <Loading />;
  }

  return <SignUpForm handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default SignUpContainer;
