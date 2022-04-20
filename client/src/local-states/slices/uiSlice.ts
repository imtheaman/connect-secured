import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ui {
  homeContent:
    | "Home"
    | "UserSettings"
    | "ChatSettings"
    | "PrivacySettings"
    | "ThemesSettings";
}

const uiSlice = createSlice({
  name: "Ui",
  initialState: {
    homeContent: "Home",
  } as Ui,
  reducers: {
    setHomeContent: (
      state: Ui,
      action: PayloadAction<
        | "Home"
        | "UserSettings"
        | "ChatSettings"
        | "PrivacySettings"
        | "ThemesSettings"
      >
    ) => {
      state.homeContent = action.payload;
    },
  },
});

const { actions, reducer: uiReducer } = uiSlice;
export const { setHomeContent } = actions;
export default uiReducer;
