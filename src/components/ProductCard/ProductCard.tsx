import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { ProductCardProps } from "./ProductCard.props";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartAction } from "../../store/cart.slice";
import { MouseEvent } from "react";

export function ProductCard(props: ProductCardProps) {


  const dispatch = useDispatch<AppDispatch>()

  const add = (event:MouseEvent)=> {
    event.preventDefault()
    dispatch(cartAction.add(props.id))
  }


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
          <button className={styles.card__cartIcon} onClick={add}  >
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
