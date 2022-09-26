import { FormEvent } from "react";
import { googleSignInAsync, loading, SignInAsync } from "redux/auth/authSlice";
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
  const signInUser = { email, password };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingStatus = useAppSelector(loading);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(SignInAsync(signInUser)).unwrap();
      navigate("/");
    } catch (err) {
      //TODO: 에러 처리 하기
    }
  };

  const googleClick = () => {
    //TODO: 수정 및 확인하기
    dispatch(googleSignInAsync());
  };

  if (loadingStatus === "pending") {
    return <Loading />;
  }

  return (
    <SignInForm
      handleChange={inputChange}
      handleSubmit={handleSubmit}
      googleClick={googleClick}
    />
  );
};

export default SignInContainer;
