import styles from "./Button.module.scss"
import { ButtonProps } from "./Button.props"

export function Button({children, size, ...props}:ButtonProps) {
   return (
    <button className={`${styles.button} ${styles[`button--${size}`]}`} {...props} >{children}</button>
   ) 
}