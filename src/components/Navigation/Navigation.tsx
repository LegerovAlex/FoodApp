import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function Navigation() {
  const {items} = useSelector((state:RootState)=> state.сart)


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
            <span className={styles.menu__cart} >  {items.reduce((acc, item)=>acc += item.count, 0)}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
