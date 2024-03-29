import { ReactNode, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavContainer from "containers/layout/NavContainer";
import styles from "styles/layout/Layout.module.scss";

export interface LayoutProps {
  children?: ReactNode;
  type?: string;
}

const Layout = ({ children, type }: LayoutProps) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowSize <= 768) {
    return (
      <div className={styles.container}>
        <Header />
        <section
          className={
            type ? `${styles.main} ${styles[`${type}`]}` : `${styles.main}`
          }
        >
          {children || <Outlet />}
        </section>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <NavContainer />
      <section
        className={
          type ? `${styles.main} ${styles[`${type}`]}` : `${styles.main}`
        }
      >
        {children || <Outlet />}
      </section>
    </div>
  );
};

export default Layout;
