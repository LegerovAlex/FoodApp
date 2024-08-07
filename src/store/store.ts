import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cards.slice";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";




export const store = configureStore(
    {
        reducer:{
            cards: cardsSlice,
            user: userSlice,
            сart: cartSlice,
        }
    }
)

store.subscribe(()=> {
    saveState(store.getState().user.jwt, JWT_PERSISTENT_STATE);
    saveState(store.getState().сart,  CART_PERSISTENT_STATE);
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch