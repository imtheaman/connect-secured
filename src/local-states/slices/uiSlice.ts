import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type HomeContent =
  | "Home"
  | "UserSettings"
  | "ChatSettings"
  | "PrivacySettings"
  | "ThemesSettings"
  | "NewChat";

interface Ui {
  homeContent: HomeContent;
  secondaryContent: false | "Profile" | "Chat" | "ProfileEdit";
  userUid: string | null;
  search: boolean;
}

const uiSlice = createSlice({
  name: "Ui",
  initialState: {
    homeContent: "Home",
    secondaryContent: false,
    userUid: null,
    search: false,
  } as Ui,
  reducers: {
    setHomeContent: (state, action: PayloadAction<HomeContent>) => {
      state.homeContent = action.payload;
    },
    secondaryContent: (
      state,
      action: PayloadAction<false | "Profile" | "Chat" | "ProfileEdit">
    ) => {
      state.secondaryContent = action.payload;
    },
    userUid: (state, action: PayloadAction<string | null>) => {
      state.userUid = action.payload;
    },
    setSearch: (state, action: PayloadAction<boolean>) => {
      state.search = action.payload;
    },
  },
});

const { actions, reducer: uiReducer } = uiSlice;
export const { setHomeContent, secondaryContent, userUid, setSearch } = actions;
export default uiReducer;
