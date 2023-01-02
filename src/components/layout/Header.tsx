import { useState } from "react";
import { ReactComponent as Profile } from "assets/images/Profile.svg";
import { currentUser } from "redux/auth/authSlice";
import { useAppSelector } from "redux/hooks";
import NavIcon from "assets/images/NavIcon.svg";
import NavContainer from "containers/layout/NavContainer";
import styles from "styles/layout/Header.module.scss";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const user = useAppSelector(currentUser);

  const handleToggleNav = () => {
    setShowNav(false);
  };

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
              <li className={styles.profile}>
                <Profile stroke="gray" />
                {user} 님
              </li>
            </ul>
            {showNav ? (
              <NavContainer
                showNav={showNav}
                handleToggleNav={handleToggleNav}
              />
            ) : null}
          </>
        ) : null}
      </header>
    </>
  );
};

export default Header;
