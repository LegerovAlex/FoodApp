import { forwardRef } from "react";
import styles from "./Input.module.scss";
import { InputProps } from "./Input.props";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isValid = true, className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`${styles.input} ${
        !isValid ? styles["input_invalid"] : ""
      } ${className}`}
      {...props}
    />
  );
});

export default Input;
