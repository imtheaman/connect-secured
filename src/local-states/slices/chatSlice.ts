import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Chat = {
  chat: { userId: string | null; chatId: string | null } | null;
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: {} as Chat,
  reducers: {
    setChatWith: (
      state: Chat,
      action: PayloadAction<{ userId: string | null; chatId: string | null }>
    ) => {
      state.chat = action.payload;
    }
  }
});

const { actions, reducer: chatReducer } = chatSlice;
export const { setChatWith } = actions;
export default chatReducer;
