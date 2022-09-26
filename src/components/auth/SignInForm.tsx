import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "styles/auth/SignInForm.module.scss";

interface SignInProps {
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  googleClick: MouseEventHandler;
}

const SignInForm = ({
  handleChange,
  handleSubmit,
  googleClick,
}: SignInProps) => {
  return (
    <div className={styles.container}>
      <h1>로그인</h1>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
            required
          />
          <button className={styles.loginBtn}>로그인</button>
        </form>
        <button onClick={googleClick} className={styles.btn}>
          Google로 로그인하기
        </button>
        <button className={styles.btn}>
          <Link to="/signup">회원가입</Link>
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
