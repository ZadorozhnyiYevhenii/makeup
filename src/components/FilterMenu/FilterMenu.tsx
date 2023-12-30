import { FC } from 'react';
import { CrossIcon } from '../../assets/CrossIcon';
import './FilterMenu.scss';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { FilterItem } from '../FilterItem/FilterItem';
import { useBlockVisibility } from '../../hooks/useBlockVisibility';
import { uniqueArray } from '../../helpers/uniqueArray';
import { useAppSelector } from '../../app/hooks';
import { useHandleFilterChange } from '../../helpers/handleFilterChange';
import { setBrandFilter, setSexFilter, setTypeFilter } from '../../app/slices/filterSlice';
import { calculateProductCountByFilter } from '../../helpers/calculateProductCountByFilter';
import { IProd } from '../../types/IProduct';

type Props = {
  isFilterMenuOpen: boolean,
  onClose: () => void,
  handleApply: () => void,
  clearFilters: () => void,
  products: IProd[] | undefined
}

export const FilterMenu: FC<Props> = ({
  isFilterMenuOpen,
  onClose,
  handleApply,
  clearFilters,
  products
}) => {
  const { brands, types, sex } = useAppSelector(state => state.filters);
  const { isBrandBlockOpen, isTypeBlockOpen, isSexOpen, handleOpenBlock } = useBlockVisibility();
  const handleFilterChange = useHandleFilterChange();

  useDisableScroll('no-scroll', isFilterMenuOpen);

  const uniqueType = uniqueArray(products, 'classification')
  const uniqueBrands = uniqueArray(products, 'brand.name');
  const uniqueSex = uniqueArray(products, 'sex');

  const handleBrandChange = (brand: string) => {
    handleFilterChange(brand, brands, setBrandFilter, 'brand');
  };

  const handleTypeChange = (type: string) => {
    handleFilterChange(type, types, setTypeFilter, 'type');
  };

  const handleSexChange = (sexType: string) => {
    handleFilterChange(sexType, sex, setSexFilter, 'sex');
  };

  const productCountByFilter = calculateProductCountByFilter(products, brands, types, sex);

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
            <div className='filter-menu__category'>Classification</div>
            <span className='filter-menu__after'>{isTypeBlockOpen ? '-' : '+'}</span>
          </div>
          <FilterItem
            productCount={productCountByFilter}
            isBlockOpen={isTypeBlockOpen}
            filterItems={uniqueType}
            selectedfilter={types}
            handleFilterChange={handleTypeChange}
          />
          <div className="filter-menu__name" onClick={() => handleOpenBlock('sex')}>
            <div className='filter-menu__category'>Sex</div>
            <span className='filter-menu__after'>{isBrandBlockOpen ? '-' : '+'}</span>
          </div>
          <FilterItem
            productCount={productCountByFilter}
            isBlockOpen={isSexOpen}
            filterItems={uniqueSex}
            selectedfilter={sex}
            handleFilterChange={handleSexChange}
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
