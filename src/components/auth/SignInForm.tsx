import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import Logo from "assets/images/Logo.png";
import styles from "styles/auth/SignInForm.module.scss";

interface SignInProps {
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  handleGoogleSubmit: MouseEventHandler;
}

const SignInForm = ({
  handleChange,
  handleSubmit,
  handleGoogleSubmit,
}: SignInProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={Logo} alt="dailyWith" />
      </div>
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
        <button onClick={handleGoogleSubmit} className={styles.btn}>
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
