import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interface/product.interface";
import { PREFIX } from "../variables/api";


export interface CardsState {
    cards: Product[],
    loading: Boolean,
    error: string | null
}

export const initialState:CardsState = {
    cards:[],
    loading:false,
    error:null,
}


export const fetchCards = createAsyncThunk<Product[]>("cards/fetchCards", async () => {
    try {
      const response = await fetch(`${PREFIX}/products`); 
      if (!response.ok) {
        const ErrorData = await response.json()
        throw new Error(ErrorData.message);
      }
      const data:Product[] = await response.json();
      return data;
    } catch (error) {
      if(error instanceof Error) {
        console.error("failed to fetch cards:", error.message)
        throw new Error(error.message)
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error("An unknown error occurred");
      }
    }
  });





export const cardsSlice = createSlice({
    name:"cards",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(fetchCards.pending, (state)=> {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCards.fulfilled, (state, action: PayloadAction<Product[]>)=> {
          state.loading = false;
          state.cards = action.payload
        })
        .addCase(fetchCards.rejected, (state, action)=> {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch cards";
        })
    }
})

export default cardsSlice.reducer
export const cardsActions = cardsSlice.actions