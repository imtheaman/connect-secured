import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import uiReducer from "../slices/uiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
