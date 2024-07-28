import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { ProductCardProps } from "./ProductCard.props";

export function ProductCard(props: ProductCardProps) {
  return (
    <Link to={`/product/${props.id}`} className={styles.link}>
      <div className={styles.card}>
        <div
          className={styles.card__wrapper}
          style={{ backgroundImage: `url("${props.image}")` }}
        >
          <div className={styles.card__price}>
            {props.price}&nbsp;
            <span className={styles.card__currency}>₽</span>
          </div>
          <button className={styles.card__cartIcon}>
            <img src="/cart-button-icon.svg" alt="add to cartd" />
          </button>
          <div className={styles.card__rating}>
            {props.rating}&nbsp;
            <img src="/star-icon.svg" alt="Star Icon" />
          </div>
        </div>
        <div className={styles.card__description}>
          <div className={styles.card__title}>{props.name}</div>
          <div className={styles.card__subtitle}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
}
