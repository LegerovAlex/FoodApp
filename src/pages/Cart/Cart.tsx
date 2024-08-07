import {  useSelector } from "react-redux";
import { Headling } from "../../components/Headling/Headling";
import {  RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { PREFIX } from "../../variables/api";
import { Product } from "../../interface/product.interface";
import { CartItem } from "../../components/CartItem/CartItem";

export function Cart() {
   
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((state: RootState) => state.сart.items);

	const getItem = async (id: number): Promise<Product> => {
		const response = await fetch(`${PREFIX}/products/${id}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data: Product = await response.json();
		return data;
	};

	const loadAllItems = async () => {
		try {
			const res = await Promise.all(items.map(i => getItem(i.id)));
			setCardProducts(res);
		} catch (error) {
			console.error('Failed to fetch products', error);
		}
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);
   



  return <>
  <Headling>Корзина</Headling>
  {items.map((item)=>{
    const product = cartProducts.find((p)=> p.id === item.id)
    if(!product) {
      return 
    }
   return <CartItem  key={item.id}  count={item.count} {...product} />
  })}
</>;
}
