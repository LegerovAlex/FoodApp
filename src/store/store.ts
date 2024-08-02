import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cards.slice";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";




export const store = configureStore(
    {
        reducer:{
            cards: cardsSlice,
            user: userSlice,
        }
    }
)

store.subscribe(()=> {
    saveState(store.getState().user.jwt, JWT_PERSISTENT_STATE)
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch