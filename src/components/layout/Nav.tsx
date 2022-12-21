import { MouseEventHandler } from "react";
import { Link, NavLink } from "react-router-dom";
import { navList } from "assets/NavData";
import { ReactComponent as SignOut } from "assets/images/Out.svg";
import Logo from "assets/images/Logo.png";
import styles from "styles/layout/Nav.module.scss";

interface Props {
  handleSignOut: MouseEventHandler;
}

const Nav = ({ handleSignOut }: Props) => {
  return (
    <nav className={styles.nav} aria-label="Breadcrumb">
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
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
        </ul>
        <div className={styles.logout}>
          <div className={styles.outIcon} onClick={handleSignOut}>
            <SignOut fill="#292D32" />
          </div>
          <div>로그아웃</div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
