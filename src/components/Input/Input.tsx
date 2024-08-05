import { forwardRef } from "react";
import styles from "./Input.module.scss";
import { InputProps } from "./Input.props";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isValid = true,  error,  className = "",  ...props },
  ref
) {
  return (
    <>
    <input
      ref={ref}
      className={`${styles.input} ${
        !isValid ? styles["input_invalid"] : ""
      } ${className}`}
      {...props}
    />
    {error && <div className={styles.error}>{error}</div>}
    </>
  );
});

export default Input;
