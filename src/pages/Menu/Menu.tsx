import { useEffect } from "react";
import { Headling } from "../../components/Headling/Headling";
import { Search } from "../../components/Search/Search";
import styles from "./Menu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCards } from "../../store/cards.slice";
import { MenuList } from "./MenuLIst/MenuLIst";

 function Menu() {
  
  const dispatch = useDispatch<AppDispatch>()
  const {loading, cards, error,} = useSelector((state:RootState)=> state.cards)
  
  
  useEffect(()=>{
    dispatch(fetchCards())
  },[dispatch])




  return (
    <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search placeholder="Search..." />
      </div>
      <div>
        {error && <p>Sorry: {error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {cards.length !== 0 ? <MenuList cards={cards} /> : <p>Card not found...</p>}
          </>
        )}
      </div>
    </>
  );
}

export default Menu
