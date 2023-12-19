import { useAppDispatch } from "../app/hooks";
import { setBrandFilter, setTypeFilter } from "../app/slices/filterSlice";

export const FilterRemove = (
  filter: string,
  brands: string[],
  types: string[],
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  switch (true) {
    case brands.includes(filter):
      dispatch(setBrandFilter(brands.filter((brand) => brand !== filter)));
      break;
    case types.includes(filter):
      dispatch(setTypeFilter(types.filter((type) => type !== filter)));
      break;
    default:
      break;
  }
};