import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";

interface UserState {
  user: IUser | null,
}

const initialState: UserState = {
  user: null,
};

const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    }
  },
});

export const { addUser, removeUser } = userState.actions;

export const userReducer = userState.reducer;