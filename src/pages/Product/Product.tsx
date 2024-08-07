import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { cardsAction, fetchCard } from "../../store/cards.slice";
import { Headling } from "../../components/Headling/Headling";
import { Button } from "../../components/Button/Button";
import styles from "./Product.module.scss";
import { cartAction } from "../../store/cart.slice";

export function Product() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, card } = useSelector(
    (state: RootState) => state.cards
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCard(id));
      dispatch(cardsAction.clearSearchCards());
    }
  }, [dispatch, id]);

  const add = () => {
    dispatch(cartAction.add(Number(card.id)));
  };

  return (
    <>
      <Link to={"/"}>
        <img src="/back-icon.svg" alt="Back Icon" />
      </Link>
      {!loading ? (
        <div className={styles.product}>
          <div className={styles.product__header}>
            <Headling>{card.name}</Headling>
            <Button onClick={add} className={styles.product__btn} size="small">
              <img src="/cart-button-icon.svg" alt="Cart Icon" />
              In Cart
            </Button>
          </div>
          <div className={styles.product__main}>
            <img
              className={styles.product__img}
              src={card.image}
              alt={card?.name}
            />
            <div className={styles.product__desc}>
              <p className={styles.product__price}>
                Price: {card.price}
                &nbsp;
                <span>₽</span>
              </p>
              <div className={styles.product__rating}>
                Rating: {card.rating}&nbsp;
                <img src="/star-icon.svg" alt="Star Icon" />
              </div>
              <p className={styles.product__ingredient}>
                Ingredients: {card.ingredients?.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
      {error && <p>Sorry: {error}</p>}
    </>
  );
}
