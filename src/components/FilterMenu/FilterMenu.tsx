import { FC } from 'react';
import { CrossIcon } from '../../assets/CrossIcon';
import './FilterMenu.scss';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { products } from '../../MockProducts';
import { FilterItem } from '../FilterItem/FilterItem';
import { useBlockVisibility } from '../../hooks/useBlockVisibility';
import { uniqueArray } from '../../helpers/uniqueArray';
import { useAppSelector } from '../../app/hooks';
import { useHandleFilterChange } from '../../helpers/handleFilterChange';
import { setBrandFilter, setTypeFilter } from '../../app/slices/filterSlice';
import { calculateProductCountByFilter } from '../../helpers/calculateProductCountByFilter';

type Props = {
  isFilterMenuOpen: boolean,
  onClose: () => void,
  handleApply: () => void,
  clearFilters: () => void,
}

export const FilterMenu: FC<Props> = ({
  isFilterMenuOpen,
  onClose,
  handleApply,
  clearFilters
}) => {
  const { brands, types } = useAppSelector(state => state.filters);
  const { isBrandBlockOpen, isTypeBlockOpen, handleOpenBlock } = useBlockVisibility();
  const handleFilterChange = useHandleFilterChange();

  useDisableScroll('no-scroll', isFilterMenuOpen);

  const uniqueType = uniqueArray(products, 'productType')
  const uniqueBrands = uniqueArray(products, 'brand');

  const handleBrandChange = (brand: string) => {
    handleFilterChange(brand, brands, setBrandFilter, 'brand')
  }

  const handleTypeChange = (type: string) => {
    handleFilterChange(type, types, setTypeFilter, 'type')
  }

  const productCountByFilter = calculateProductCountByFilter(products, brands, types);

  return (
    <aside className={`filter-menu ${isFilterMenuOpen ? 'open' : ''}`}>
      <div className="filter-menu__wrapper">
        <div className='filter-menu__top'>
          <span className='filter-menu__title'>Filters</span>
          <div
            className='filter-menu__close'
            onClick={onClose}
          >
            <CrossIcon />
          </div>
        </div>
        <div className='filter-menu__content'>
          <div className="filter-menu__name" onClick={() => handleOpenBlock('brand')}>
            <div className='filter-menu__category'>Brand</div>
            <span className='filter-menu__after'>{isBrandBlockOpen ? '-' : '+'}</span>
          </div>
          <FilterItem
            productCount={productCountByFilter}
            isBlockOpen={isBrandBlockOpen}
            filterItems={uniqueBrands}
            selectedfilter={brands}
            handleFilterChange={handleBrandChange}
          />
          <div className="filter-menu__name" onClick={() => handleOpenBlock('type')}>
            <div className='filter-menu__category'>Type</div>
            <span className='filter-menu__after'>{isTypeBlockOpen ? '-' : '+'}</span>
          </div>
          <FilterItem
            productCount={productCountByFilter}
            isBlockOpen={isTypeBlockOpen}
            filterItems={uniqueType}
            selectedfilter={types}
            handleFilterChange={handleTypeChange}
          />
        </div>
        <div className='filter-menu__buttons'>
          <button
            type='button'
            onClick={clearFilters}
            className='filter-menu__button filter-menu__button--reset'
          >
            Clear
          </button>
          <button
            type='button'
            className='filter-menu__button filter-menu__button--apply'
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </aside>
  );
}
