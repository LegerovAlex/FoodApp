
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PREFIX } from "../variables/api";
import { LoginResponce } from "../interface/user.interface";
import { loadState } from "./storage";


export const JWT_PERSISTENT_STATE = "jwt"


export interface UserState {
    jwt: string | null;
    loading: boolean;
    error: string | null;
   
}


const initialState:UserState = {
    jwt:loadState(JWT_PERSISTENT_STATE) ?? null,
    loading: false,
    error: null,
}


export interface LoginParams {
    email: string;
    password: string;
    name?:string
}


export const login = createAsyncThunk<LoginResponce, LoginParams>("user/login", async ({email, password}) => {
    try {
      const response = await fetch(`${PREFIX}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
      }); 
      if (!response.ok) {
        const ErrorData = await response.json()
        throw new Error(ErrorData.message);
      }
      const data: LoginResponce = await response.json();
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




export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout(state){ 
            state.jwt = null
            
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(login.pending, (state,)=> {
            state.loading = true,
            state.error = null
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponce>) => {
             state.loading = false,
             state.jwt = action.payload.access_token
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error =  action.error.message || "An unknown error occurred";
        });
    }
})


export default userSlice.reducer
export const userAction = userSlice.actions 