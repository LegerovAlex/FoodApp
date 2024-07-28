import styles from "./Search.module.scss";
import { SearchProps } from "./Search.props";

export function Search({
  isValid = true,
  className = "",
  ...props
}: SearchProps) {
  return (
    <div className={styles.search}>
      <input
        className={`${styles.search__input} ${
          !isValid ? styles["search__input_invalid"] : ""
        } ${className}`}
        {...props}
      />
      <img
        className={styles.search__icon}
        src="/search-icon.svg"
        alt="Search Icon"
      />
    </div>
  );
}
