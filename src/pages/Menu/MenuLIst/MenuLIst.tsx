import { ProductCard } from "../../../components/ProductCard/ProductCard"
import styles from "./MenuList.module.scss"
import { MenuListProps } from "./MenuLIst.prop"


export function MenuList({cards}:MenuListProps) {
    return(
        <div className={styles.wrapper} >
            {cards.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.ingredients.join(", ")}
                  rating={item.rating}
                  price={item.price}
                  image={item.image}
                />    
              ))}</div>
    )
}