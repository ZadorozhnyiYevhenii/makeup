import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { getSearchWith } from './getSearchWith';

type SetFilterAction = (values: string[]) => { type: string; payload: string[] };

export const useHandleFilterChange = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (
    value: string,
    selectedValues: string[],
    setFilterAction: SetFilterAction,
    filterParam: string
  ) => {
    if (selectedValues.includes(value)) {
      dispatch(setFilterAction(selectedValues.filter((v) => v !== value)));
    } else {
      dispatch(setFilterAction([...selectedValues, value]));
    }

    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSearchParams(
      getSearchWith(
        searchParams,
        {
          [filterParam]: updatedValues.length > 0 ? updatedValues.join(',') : null,
        }
      )
    );
  };

  return handleFilterChange;
};
