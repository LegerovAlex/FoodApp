import { Outlet } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { Navigation } from "../components/Navigation/Navigation";
import { Profile } from "../components/Profile/Profile";
import styles from "./Layout.module.scss";

export function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Profile />
        <Navigation />
        <Button className={styles.button__exit} size="big">
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
