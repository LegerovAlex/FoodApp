import { useEffect, useState } from "react";
import { Headling } from "../../components/Headling/Headling";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Search } from "../../components/Search/Search";
import styles from "./Menu.module.scss";
import { PREFIX } from "../../variables/api";
import { Product } from "../../interface/product.interface";

export function Menu() {
  const [product, setProducts] = useState<Product[]>([]);

  async function getMenu() {
    try {
      const res = await fetch(`${PREFIX}/products`);
      if (!res.ok) {
        return;
      }
      const data = (await res.json()) as Product[];
      setProducts(data);
    } catch (e) {
      console.error(e);
      return;
    }
  }

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search placeholder="Search..." />
      </div>
      <div>
        {product.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.ingredients.join(", ")}
            rating={item.rating}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </>
  );
}
