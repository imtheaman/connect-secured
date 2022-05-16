import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlice";
import sessionReducer from "../slices/sessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;