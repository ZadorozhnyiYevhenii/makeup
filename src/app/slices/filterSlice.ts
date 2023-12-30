import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterState = {
  brands: string[],
  types: string[],
  sex: string[]
};

const initialState: FilterState = {
  brands: [],
  types: [],
  sex: []
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
    setSexFilter: (state, action: PayloadAction<string[]>) => {
      state.sex = action.payload
    },
    clearFilters: (state) => {
      state.brands = [];
      state.types = [];
    },
  },
});

export const { setBrandFilter, setTypeFilter, setSexFilter,clearFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;