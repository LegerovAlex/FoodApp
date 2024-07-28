import styles from "./Headling.module.scss";
import { HeadlingProps } from "./Headling.props";

export function Headling({ children, ...props }: HeadlingProps) {
  return (
    <h1 className={styles.title} {...props}>
      {children}
    </h1>
  );
}
