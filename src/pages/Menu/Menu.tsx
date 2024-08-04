import { useEffect } from "react";
import { Headling } from "../../components/Headling/Headling";
import { Search } from "../../components/Search/Search";
import styles from "./Menu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCards } from "../../store/cards.slice";
import { MenuList } from "./MenuLIst/MenuLIst";

function Menu() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, cards, error, searchCards, searchError } = useSelector(
    (state: RootState) => state.cards
  );

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const displayCards = searchCards.length > 0 ? searchCards : cards;

  return (
    <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search placeholder="Search..." />
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {searchError ? <p>{searchError}</p> : <MenuList cards={displayCards} />}
      </div>
    </>
  );
}

export default Menu;
