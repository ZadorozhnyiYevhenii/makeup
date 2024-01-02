import { PayloadAction } from "@reduxjs/toolkit";
import { clearFilters, filterReducer, setBrandFilter, setTypeFilter } from "../../app/slices/filterSlice";

const initialState = {
  brands: [],
  types: [],
  sex: []
};

describe('filterReducer', () => {
  test('should handle brand filter', () => {
    const action: PayloadAction<string[]> = setBrandFilter(['brand 1', 'brand2']);
    const state = filterReducer(initialState, action);

    expect(state.brands).toEqual(['brand 1', 'brand2']);
    expect(state.types).toEqual([]);
  });

  test('should handle types filter', () => {
    const action: PayloadAction<string[]> = setTypeFilter(['type 1', 'type 2']);
    const state = filterReducer(initialState, action);

    expect(state.types).toEqual(['type 1', 'type 2']);
    expect(state.brands).toEqual([]);
  })

  test('should clear filters correctly', () => {
    const currentState = {
      brands: ['brand'],
      types: ['type'],
      sex: ['sex']
    };

    const action: PayloadAction<void> = clearFilters();
    const state = filterReducer(currentState, action);

    expect(state.brands).toEqual([]);
    expect(state.types).toEqual([]);
  })
})
