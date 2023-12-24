import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterState = {
  brands: string[],
  types: string[],
};

const initialState: FilterState = {
  brands: [],
  types: [],
};


const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setBrandFilter: (state, action: PayloadAction<string[]>) => {
      state.brands = action.payload
    },
    setTypeFilter: (state, action: PayloadAction<string[]>) => {
      state.types = action.payload
    },
    clearFilters: (state) => {
      state.brands = [];
      state.types = [];
    },
  },
});

export const { setBrandFilter, setTypeFilter, clearFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;