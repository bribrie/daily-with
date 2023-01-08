import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { authLoading, signUpAsync } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import useInput from "hooks/useInput";
import Loading from "components/layout/Loading";
import SignUpForm from "components/auth/SignUpForm";

const SignUpContainer = () => {
  const [{ email, password, centerName }, handleChange] = useInput({
    email: "",
    password: "",
    centerName: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingStatus = useAppSelector(authLoading);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const signUpUser = { email, password, centerName };
    if (email.length < 6 || password.length < 6) {
      alert("6글자 이상 입력하세요.");
    }

    try {
      await dispatch(signUpAsync(signUpUser)).unwrap();
      navigate("/");
    } catch (err: any) {
      if (err.includes("email-already-in-use")) {
        alert("이미 존재하는 회원입니다.");
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
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
