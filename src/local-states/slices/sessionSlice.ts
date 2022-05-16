import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Session {
  privateKey: string;
  token: string;
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: {} as Session,
  reducers: {
    setToken: (state: Session, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setPrivateKey: (state: Session, action: PayloadAction<string>) => {
      state.privateKey = action.payload;
    },
  },
});

const { actions, reducer: sessionReducer } = sessionSlice;
export const { setToken, setPrivateKey } = actions;
export default sessionReducer;
