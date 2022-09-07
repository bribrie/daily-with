import { Link } from "react-router-dom";
import { MouseEventHandler } from "react";
import { ReactComponent as Profile } from "assets/images/Profile.svg";
import { ReactComponent as Arrow } from "assets/images/Arrow.svg";
import styles from "styles/layout/Header.module.scss";

interface HeaderProps {
  user?: string;
  toggle: boolean;
  handleToggle: MouseEventHandler;
  handleSignOut?: MouseEventHandler;
}

const Header = ({ toggle, handleToggle, handleSignOut, user }: HeaderProps) => {
  return (
    <header>
      <ul>
        {user ? (
          <>
            <li>
              <Profile stroke="gray" />
            </li>

            <li>{user} 님</li>
            <li>
              <Arrow stroke="gray" onClick={handleToggle} />
            </li>

            <div className={toggle ? styles.userNavShow : styles.userNav}>
              <li>
                <Link to="/user">마이페이지</Link>
              </li>
              <li onClick={handleSignOut}>로그아웃</li>
            </div>
          </>
        ) : (
          <>
            <li>
              <Profile stroke="gray" onClick={handleToggle} />
            </li>
            <li className={toggle ? styles.userNavShow : styles.userNav}>
              <Link to="/signin">로그인</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
