import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.scss";

export function AuthLayout() {
 
  return (
    <div className={styles.layout}>
      <div className={styles.layout__logo}>
         <img src="/logo.svg" alt="Logo" />
      </div>
      <div className={styles.layout__content}>
        <Outlet />
      </div>
    </div>
  );
}