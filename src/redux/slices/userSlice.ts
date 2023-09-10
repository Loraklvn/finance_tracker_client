import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { User } from '@/src/types/user';

export interface UserState {
  isAuth: boolean;
  user: User | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth: (state, action: PayloadAction<{ user: User | null }>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload.user;
      state.isAuth = !!action.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserAuth } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
