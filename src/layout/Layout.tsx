import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { Navigation } from "../components/Navigation/Navigation";
import { Profile } from "../components/Profile/Profile";
import styles from "./Layout.module.scss";
import { useDispatch,  } from "react-redux";
import { userAction } from "../store/user.slice";
import { AppDispatch  } from "../store/store";
import {} from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();



  const logout = () => {
    dispatch(userAction.logout());
    navigate("/auth/login");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Profile />
        <Navigation />
        <Button className={styles.button__exit} size="big" onClick={logout}>
          <img src="/exit-icon.svg" alt="Icon Exit" />
          Logout
        </Button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
