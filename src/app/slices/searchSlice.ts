import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SearchState = {
  searchString: string;
};

const initialState: SearchState = {
  searchString: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload
    }
  }
});

export const { setSearchString } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;