import { NavLink } from "react-router-dom";
import { navList } from "assets/NavData";
import styles from "styles/layout/Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.nav} aria-label="Breadcrumb">
      <div className={styles.wrapper}>
        <div className={styles.logo}>Daily WITH</div>
        <ul className={styles.list}>
          {navList.map((list) => (
            <li key={list.name}>
              <NavLink
                to={list.address}
                aria-current="page"
                className={styles.link}
              >
                <div>{<list.image />}</div>
                <div>{list.name}</div>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.logout}>로그아웃?</div>
      </div>
    </nav>
  );
};

export default Nav;
