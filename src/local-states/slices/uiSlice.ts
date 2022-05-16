import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type HomeContent =
  | 'Home'
  | 'UserSettings'
  | 'ChatSettings'
  | 'PrivacySettings'
  | 'ThemesSettings'
  | 'NewChat';

interface Ui {
  homeContent: HomeContent;
  secondaryContent: false | 'Profile' | 'Chat' | 'ProfileEdit';
  userUid: string | null;
}

const uiSlice = createSlice({
  name: 'Ui',
  initialState: {
    homeContent: 'Home',
    secondaryContent: false,
    userUid: null,
    search: false,
  } as Ui,
  reducers: {
    setHomeContent: (state: Ui, action: PayloadAction<HomeContent>) => {
      state.homeContent = action.payload;
    },
    secondaryContent: (
      state: Ui,
      action: PayloadAction<false | 'Profile' | 'Chat' | 'ProfileEdit'>
    ) => {
      state.secondaryContent = action.payload;
    },
    userUid: (state: Ui, action: PayloadAction<string | null>) => {
      state.userUid = action.payload;
    }
  },
});

const { actions, reducer: uiReducer } = uiSlice;
export const { setHomeContent, secondaryContent, userUid } = actions;
export default uiReducer;
