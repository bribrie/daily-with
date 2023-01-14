import { memo, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { signOutAsync } from "redux/auth/authSlice";
import { useAppDispatch } from "redux/hooks";
import Nav from "components/layout/Nav";
import MobileNav from "components/layout/MobileNav";

export interface NavProps {
  showNav?: boolean;
  handleToggleNav?: MouseEventHandler;
}

const NavContainer = ({ showNav, handleToggleNav }: NavProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await dispatch(signOutAsync());
    navigate("/", { replace: true });
  };

  if (showNav === true && handleToggleNav) {
    return (
      <MobileNav
        handleSignOut={handleSignOut}
        showNav={showNav}
        handleToggleNav={handleToggleNav}
      />
    );
  }
  return <Nav handleSignOut={handleSignOut} />;
};

export default memo(NavContainer);
