import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PREFIX } from "../variables/api";
import { LoginResponce } from "../interface/user.interface";
import { loadState } from "./storage";
import { Profile } from "../interface/profile.interface";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserState {
  jwt: string | null;
  loading: boolean;
  error: string | null;
  loginErrorMessage?: string | null;
  registerErrorMessage?: string | null;
  profile?: Profile;
}

const initialState: UserState = {
  jwt: loadState(JWT_PERSISTENT_STATE) ?? null,
  loading: false,
  error: null,
};

export interface LoginParams {
  email: string;
  password: string;
  name?: string;
}

export const getLogin = createAsyncThunk<LoginResponce, LoginParams>(
  "user/login",
  async ({ email, password }) => {
    try {
      const response = await fetch(`${PREFIX}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new Error(ErrorData.message);
      }
      const data: LoginResponce = await response.json();
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

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  "user/getProfile",
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    try {
      const response = await fetch(`${PREFIX}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new Error(ErrorData.message);
      }
      const data: Profile = await response.json();
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

export const register = createAsyncThunk<LoginResponce, LoginParams>(
  "user/register",
  async ({ email, password, name }) => {
    try {
      const response = await fetch(`${PREFIX}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new Error(ErrorData.message);
      }
      const data: LoginResponce = await response.json();
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.jwt = null;
    },
    clearLoginError(state) {
      state.loginErrorMessage = null;
    },
    clearRegisterError(state) {
      state.registerErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state) => {
        (state.loading = true), (state.loginErrorMessage = null);
      })
      .addCase(
        getLogin.fulfilled,
        (state, action: PayloadAction<LoginResponce>) => {
          (state.loading = false), (state.jwt = action.payload.access_token);
        }
      )
      .addCase(getLogin.rejected, (state, action) => {
        state.loading = false;
        state.loginErrorMessage =
          action.error.message || "An unknown error occurred";
      })
      .addCase(getProfile.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          (state.loading = false), (state.profile = action.payload);
        }
      )
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      })
      .addCase(register.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<LoginResponce>) => {
          (state.loading = false), (state.jwt = action.payload.access_token);
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.registerErrorMessage =
          action.error.message || "An unknown error occurred";
      });
  },
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
