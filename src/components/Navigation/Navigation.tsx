import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${styles.menu__link}
             ${isActive ? styles["menu__link_active"] : ""}
            `
            }
          >
            <img src="/menu-icon.svg" alt="Icon menu" />
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              `${styles.menu__link}
             ${isActive ? styles["menu__link_active"] : ""}
            `
            }
          >
            <img src="/cart-icon.svg" alt="Icon cart" />
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
