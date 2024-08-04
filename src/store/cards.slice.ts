import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interface/product.interface";
import { PREFIX } from "../variables/api";

export interface CardsState {
  cards: Product[];
  card: Partial<Product>;
  searchCards: Product[];
  loading: boolean;
  error: string | null;
  searchError: string | null;
}

export const initialState: CardsState = {
  cards: [],
  card: {},
  searchCards: [],
  loading: false,
  error: null,
  searchError: null,
};

export const fetchCards = createAsyncThunk<Product[]>(
  "cards/fetchCards",
  async () => {
    try {
      const response = await fetch(`${PREFIX}/products`);
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new Error(ErrorData.message);
      }
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("failed to fetch cards:", error.message);
        throw new Error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error("An unknown error occurred");
      }
    }
  }
);

export const fetchSearchCards = createAsyncThunk(
  "cards/fetchSearchCards",
  async (value: string) => {
    try {
      const response = await fetch(`${PREFIX}/products?name=${value}`);
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new Error(ErrorData.message);
      }
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("failed to fetch cards:", error.message);
        throw new Error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error("An unknown error occurred");
      }
    }
  }
);

export const fetchCard = createAsyncThunk<Product, string>(
  "cards/fetchCard",
  async (id) => {
    try {
      const response = await fetch(`${PREFIX}/products/${id}`);
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new Error(ErrorData.message);
      }
      const data: Product = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("failed to fetch cards:", error.message);
        throw new Error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error("An unknown error occurred");
      }
    }
  }
);

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearSearchCards(state) {
      state.searchError = null;
      state.searchCards = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCards.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.cards = action.payload;
        }
      )
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cards";
      })
      .addCase(fetchCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCard.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.card = action.payload;
      })
      .addCase(fetchCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch card";
      })
      .addCase(fetchSearchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSearchCards.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.searchCards = action.payload;
          if (action.payload.length === 0) {
            state.searchError = "No cards found";
          }
        }
      )
      .addCase(fetchSearchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search cards";
      });
  },
});

export default cardsSlice.reducer;
export const cardsAction = cardsSlice.actions;
