import { FormEvent } from "react";
import {
  googleSignInAsync,
  authLoading,
  signInAsync,
} from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import useInput from "hooks/useInput";
import SignInForm from "components/auth/SignInForm";
import { useNavigate } from "react-router-dom";
import Loading from "components/layout/Loading";

const SignInContainer = () => {
  const [{ email, password }, inputChange] = useInput({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingStatus = useAppSelector(authLoading);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const signInUser = { email, password };
      await dispatch(signInAsync(signInUser)).unwrap();
      navigate("/");
    } catch {
      alert("일치하는 회원 정보가 없습니다.");
    }
  };

  const handleGoogleSubmit = async () => {
    try {
      await dispatch(googleSignInAsync());
      navigate("/");
    } catch {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loadingStatus === "pending") {
    return <Loading />;
  }

  return (
    <SignInForm
      handleChange={inputChange}
      handleSubmit={handleSubmit}
      handleGoogleSubmit={handleGoogleSubmit}
    />
  );
};

export default SignInContainer;
