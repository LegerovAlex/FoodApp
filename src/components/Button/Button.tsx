import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";

export function Button({ children, className, size, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[`button_${size}`]} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}
