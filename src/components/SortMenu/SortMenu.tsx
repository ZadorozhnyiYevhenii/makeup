import { FC } from "react";
import { SortOptions } from "../../utils/sortOptions"
import './SortMenu.scss';
import { useDisableScroll } from "../../hooks/useDisableScroll";
import { useWindowResize } from "../../hooks/useWindowResize";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  onClose: () => void,
  onSort: (sortBy: SortOptions) => void,
  isSortMenuOpen: boolean,
  selectedSortOption: SortOptions | null,
}

export const SortMenu: FC<Props> = ({
  onClose,
  onSort,
  isSortMenuOpen,
  selectedSortOption
}) => {

  const handleSort = (sortby: SortOptions) => {
    onSort(sortby);
  };

  const isMobile = useWindowResize(1023);
  
  useDisableScroll('no-scroll', isSortMenuOpen)

  return (
    <>
      <div className="background-overlay" data-testid="background-overlay" style={{ display: isSortMenuOpen && isMobile ? 'block' : 'none' }}></div>
      <div className="sort">
        <div className="sort__mobile-header">
          <span>Sorting</span>
          <div
            onClick={onClose}
            data-testid="onClose-button"
            className="sort__close-button"
          >
            <CloseIcon />
          </div>
        </div>
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
    </>
  )
}