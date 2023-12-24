import { FC } from "react";
import { SortOptions } from "../../utils/sortOptions";
import './DesktopSortOptionsAndQuantity.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  handleSort: (sortBy: SortOptions) => void,
  isSortMenuOpen: boolean,
  selectedSortOption: SortOptions | null,
  handleOpen: () => void,
}

export const DesktopSortOptionsAndQuantity: FC<Props> = ({
  handleSort,
  isSortMenuOpen,
  selectedSortOption,
  handleOpen
}) => {
  return (
    <div className="sort-menu">
      <span
        className="sort-menu__title"
        onClick={handleOpen}
      >
        Sort as: 
        <span className="sort-menu__sort">{selectedSortOption}</span>
        <span className="sort-menu__icon"><ExpandMoreIcon/></span>
      </span>
      {isSortMenuOpen && (
        <div className="sort-menu__content">
          <ul className="sort__list">
            <li
              className={`sort__item ${selectedSortOption === SortOptions.BY_NAME ? 'sort__item--selected' : ''}`}
              onClick={() => handleSort(SortOptions.BY_NAME)}
            >
              {SortOptions.BY_NAME}
            </li>
            <li
              className={`sort__item ${selectedSortOption === SortOptions.BY_PRICE ? 'sort__item--selected' : ''}`}
              onClick={() => handleSort(SortOptions.BY_PRICE)}
            >
              {SortOptions.BY_PRICE}
            </li>
            <li
              className={`sort__item ${selectedSortOption === SortOptions.ASCENDING ? 'sort__item--selected' : ''}`}
              onClick={() => handleSort(SortOptions.ASCENDING)}
            >
              {SortOptions.ASCENDING}
            </li>
            <li
              className={`sort__item ${selectedSortOption === SortOptions.DESCENDING ? 'sort__item--selected' : ''}`}
              onClick={() => handleSort(SortOptions.DESCENDING)}
            >
              {SortOptions.DESCENDING}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}