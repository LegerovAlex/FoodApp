import { useDispatch } from "react-redux";
import styles from "./Search.module.scss";
import { SearchProps } from "./Search.props";
import { AppDispatch } from "../../store/store";
import { ChangeEvent, useState } from "react";
import {
  cardsAction,
  fetchCards,
  fetchSearchCards,
} from "../../store/cards.slice";

export function Search({
  isValid = true,
  className = "",
  ...props
}: SearchProps) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.trim() === "") {
      dispatch(cardsAction.clearSearchCards());
      dispatch(fetchCards());
    } else {
      dispatch(fetchSearchCards(newValue));
    }
  };

  return (
    <div className={styles.search}>
      <input
        className={`${styles.search__input} ${
          !isValid ? styles["search__input_invalid"] : ""
        } ${className}`}
        value={value}
        onChange={handleChange}
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
