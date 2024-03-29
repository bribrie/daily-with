import { ChangeEventHandler, FormEventHandler } from "react";
import Logo from "assets/images/Logo.webp";
import styles from "styles/auth/SignUpForm.module.scss";

interface SignUpProps {
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
}

const SignUpForm = ({ handleChange, handleSubmit }: SignUpProps) => {
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
          <input
            name="centerName"
            type="text"
            placeholder="센터 이름을 입력해주세요"
            onChange={handleChange}
            required
          />
          <button>가입하기</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
