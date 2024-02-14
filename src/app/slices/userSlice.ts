import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";
import { StringLiteralType } from "typescript";

interface UserState {
  userJWT: string,
  user: IUser | null,
}

const initialState: UserState = {
  userJWT: '',
  user: null,
};

const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserJWT: (state, action) => {
      state.userJWT = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.userJWT = '';
    }
  },
});

export const { addUser, addUserJWT, removeUser } = userState.actions;

export const userReducer = userState.reducer;