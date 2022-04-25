import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSession {
  session: {
    expires: Date;
    user: {
      name: string;
      email: string;
      image: string;
    };
  };
  status: "authenticated" | "loading";
}

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUserSession: (state, action: PayloadAction<UserSession>) => {
      state = action.payload;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
export const { setUserSession } = actions;
export default userReducer;
