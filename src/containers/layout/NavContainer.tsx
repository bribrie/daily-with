import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { signOutAsync } from "redux/auth/authSlice";
import { useAppDispatch } from "redux/hooks";
import Nav from "components/layout/Nav";
import MobileNav from "components/layout/MobileNav";

export interface NavProps {
  showNav?: boolean;
}

const NavContainer = ({ showNav }: NavProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    dispatch(signOutAsync());
    navigate("/");
  }, [dispatch, navigate]);

  if (showNav) {
    return <MobileNav handleSignOut={handleSignOut} showNav={showNav} />;
  }
  return <Nav handleSignOut={handleSignOut} />;
};

export default memo(NavContainer);
