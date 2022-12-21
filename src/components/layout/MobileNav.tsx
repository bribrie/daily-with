import { MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";
import { navList } from "assets/NavData";
import { ReactComponent as SignOut } from "assets/images/Out.svg";
import styles from "styles/layout/MobileNav.module.scss";

interface Props {
  showNav: boolean;
  handleSignOut: MouseEventHandler;
}

const MobileNav = ({ showNav, handleSignOut }: Props) => {
  return showNav ? (
    <nav className={styles.nav} aria-label="Breadcrumb">
      <ul className={styles.listWrapper}>
        {navList.map((list) => (
          <li className={styles.listItem} key={list.name}>
            <NavLink
              to={list.address}
              aria-current="page"
              className={({ isActive }) =>
                isActive ? styles.clicked : undefined
              }
            >
              <div className={styles.itemContent}>
                {<list.image fill="#292D32" />}
                {list.name}
              </div>
            </NavLink>
          </li>
        ))}
        <li className={styles.listItem} onClick={handleSignOut}>
          <div className={styles.itemContent}>
            <SignOut fill="#292D32" />
            로그아웃
          </div>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default MobileNav;
