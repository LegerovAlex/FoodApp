import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cards.slice";



export const store = configureStore(
    {
        reducer:{
            cards: cardsSlice
        }
    }
)




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch