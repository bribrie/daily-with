import HeaderContainer from "containers/layout/HeaderContainer";
import { LayoutProps } from "./Layout";
import { Outlet } from "react-router-dom";
import styles from "styles/layout/AuthLayout.module.scss";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <HeaderContainer />
      <div className={styles.main}>{children || <Outlet />}</div>
    </div>
  );
};

export default AuthLayout;
