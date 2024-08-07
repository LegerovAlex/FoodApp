
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const CART_PERSISTENT_STATE = 'cartData';

export interface cartItem {
    id:number,
    count:number,
}



export interface cartState   {
    items: cartItem[],
  
}


const initialState: cartState = loadState(CART_PERSISTENT_STATE) ?? {
    items: [],
};



export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add (state, action:PayloadAction<number> ) {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({ id: action.payload, count: 1 });
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                if (existingItem.count > 1) {
                    existingItem.count -= 1;
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload);
                }
            }

		},
        delete(state, action:PayloadAction<number>) {
         state.items = state.items.filter((item)=> item.id !== action.payload)    
        }
        
    },
 
        });
  
  export default cartSlice.reducer;
  export const cartAction = cartSlice.actions;
  