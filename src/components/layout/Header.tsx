import { MouseEventHandler, useState } from "react";
import { ReactComponent as Profile } from "assets/images/Profile.svg";
import { ReactComponent as Arrow } from "assets/images/Arrow.svg";
import NavIcon from "assets/images/NavIcon.svg";
import NavContainer from "containers/layout/NavContainer";
import styles from "styles/layout/Header.module.scss";

interface HeaderProps {
  user?: string;
  toggle: boolean;
  handleToggle: MouseEventHandler;
  handleSignOut?: MouseEventHandler;
}

const Header = ({ toggle, handleToggle, handleSignOut, user }: HeaderProps) => {
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <header>
        {user ? (
          <>
            <ul>
              <li
                className={styles.navIcon}
                onClick={() => setShowNav(!showNav)}
              >
                <img src={NavIcon} alt="navigation" />
              </li>
              <>
                <li className={styles.profile}>
                  <Profile stroke="gray" onClick={handleToggle} />
                  {user} 님
                  {showNav ? (
                    <Arrow stroke="transparent" />
                  ) : (
                    <Arrow stroke="gray" onClick={handleToggle} />
                  )}
                </li>
                <li
                  className={toggle ? styles.userNavShow : styles.userNav}
                  onClick={handleSignOut}
                >
                  로그아웃
                </li>
              </>
            </ul>
            {showNav ? <NavContainer showNav={showNav} /> : null}
          </>
        ) : null}
      </header>
    </>
  );
};

export default Header;
