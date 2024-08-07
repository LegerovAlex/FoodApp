import { useDispatch, useSelector } from "react-redux";
import { Headling } from "../../components/Headling/Headling";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { PREFIX } from "../../variables/api";
import { Product } from "../../interface/product.interface";
import { CartItem } from "../../components/CartItem/CartItem";
import styles from "./Cart.module.scss";
import { Button } from "../../components/Button/Button";
import { cartAction } from "../../store/cart.slice";
import { useNavigate } from "react-router-dom";

const DELIVERY_FEE = 169;

export function Cart() {
  const [cartProducts, setCardProducts] = useState<Product[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.сart.items);
  const navigate = useNavigate();
  const total = items
    .map((item) => {
      const product = cartProducts.find((p) => p.id === item.id);
      if (!product) {
        return 0;
      }
      return item.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  const getItem = async (id: number): Promise<Product> => {
    const response = await fetch(`${PREFIX}/products/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Product = await response.json();
    return data;
  };

  const loadAllItems = async () => {
    try {
      const res = await Promise.all(items.map((i) => getItem(i.id)));
      setCardProducts(res);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const order = () => {
    dispatch(cartAction.clean());
    navigate("/");
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Headling>Корзина</Headling>
      {items.map((item) => {
        const product = cartProducts.find((p) => p.id === item.id);
        if (!product) {
          return;
        }
        return <CartItem key={item.id} count={item.count} {...product} />;
      })}
      <div className={styles.line}>
        <div className={styles.text}>Total</div>
        <div className={styles.price}>
          {total}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.line}>
        <div className={styles.text}>Delivery</div>
        <div className={styles.price}>
          {DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.line}>
        <div className={styles.text}>Total Amount</div>
        <div className={styles.price}>
          {total + DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
        <div className={styles["checkout"]}>
          <Button onClick={order} size="big">
            оформить
          </Button>
        </div>
      </div>
    </>
  );
}
