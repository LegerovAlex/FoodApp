import { useDispatch } from "react-redux";
import styles from "./CartItem.module.scss"
import { CartItemProps } from "./CartItem.props";
import { AppDispatch } from "../../store/store";
import { cartAction } from "../../store/cart.slice";

export function CartItem(props:CartItemProps) {
	 

    const dispatch = useDispatch<AppDispatch>()

    const increase = () => {
		dispatch(cartAction.add(props.id));
	};

	const descrease = () => {
		dispatch(cartAction.remove(props.id));
	};

	const remove = () => {
		dispatch(cartAction.delete(props.id));
	};

	return (
		<div className={styles.item}>
			<div className={styles.image} style={{ backgroundImage: `url('${props.image}')` }}></div>
			<div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.price}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles.actions}>
				<button className={styles.minus} onClick={descrease} >
					<img src="/minus-icon.svg" alt="Remove from cart"    />
				</button>
				<div>{props.count}</div>
				<button className={styles.plus} onClick={increase}>
					<img src="/plus-icon.svg" alt="Add to cart" />
				</button>
				<button className={styles.remove} onClick={remove} >
					<img src="/delete-icon.svg" alt="Remove all" />
				</button>
			</div>
		</div>
	);
}

