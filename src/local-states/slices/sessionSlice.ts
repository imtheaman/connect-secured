import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../apollo/types';

export interface Session {
  privateKey: string;
  token: string;
  user: User;
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
    setUser: (state: Session, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
});

const { actions, reducer: sessionReducer } = sessionSlice;
export const { setToken, setPrivateKey, setUser } = actions;
export default sessionReducer;
