import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentUser, signOutAsync } from "redux/auth/authSlice";
import Header from "components/layout/Header";

const HeaderContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(currentUser);
  const [toggle, setToggle] = useState(false);

  const handleSignOut = () => {
    dispatch(signOutAsync());
    navigate("/home");
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  if (user) {
    return (
      <Header
        user={user}
        toggle={toggle}
        handleToggle={handleToggle}
        handleSignOut={handleSignOut}
      />
    );
  } else {
    return <Header toggle={toggle} handleToggle={handleToggle} />;
  }
};

export default HeaderContainer;
