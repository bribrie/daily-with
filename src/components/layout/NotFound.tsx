import { Link } from "react-router-dom";
import { ReactComponent as Alert } from "assets/images/Alert.svg";
import { useAppSelector } from "redux/hooks";
import { currentUser } from "redux/auth/authSlice";
import Header from "./Header";
import styles from "styles/layout/NotFound.module.scss";

const NotFound = () => {
  const user = useAppSelector(currentUser);

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.main}>
        <div className={styles.icon}>
          <Alert stroke="gray" />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div>서비스 이용에 불편을 드려 죄송합니다.</div>
            <div>존재하지 않는 페이지입니다.</div>
          </div>
          <button className={styles.button}>
            <Link to="/">{user ? "홈으로 이동" : "로그인 페이지로 이동"}</Link>
          </button>
        </div>
      </section>
    </div>
  );
};
export default NotFound;
