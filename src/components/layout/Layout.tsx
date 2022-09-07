import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import HeaderContainer from "containers/layout/HeaderContainer";
import Nav from "./Nav";
import styles from "styles/layout/Layout.module.scss";

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <HeaderContainer />
      <Nav />
      <section className={styles.main}> {children || <Outlet />}</section>
    </div>
  );
};

export default Layout;
