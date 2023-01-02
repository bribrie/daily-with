import { LayoutProps } from "./Layout";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "styles/layout/AuthLayout.module.scss";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>{children || <Outlet />}</div>
    </div>
  );
};

export default AuthLayout;
