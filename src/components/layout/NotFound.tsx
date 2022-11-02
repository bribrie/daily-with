import { Link } from "react-router-dom";
import { ReactComponent as Alert } from "assets/images/Alert.svg";
import HeaderContainer from "containers/layout/HeaderContainer";
import styles from "styles/layout/NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <HeaderContainer />
      <section className={styles.main}>
        <div className={styles.icon}>
          <Alert stroke="gray" />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div>서비스 이용에 불편을 드려 죄송합니다.</div>
            <div>요청하신 페이지에 사용 권한이 없습니다.</div>
          </div>
          <button className={styles.button}>
            <Link to="/signin">로그인 페이지로 이동</Link>
          </button>
        </div>
      </section>
    </div>
  );
};
export default NotFound;
