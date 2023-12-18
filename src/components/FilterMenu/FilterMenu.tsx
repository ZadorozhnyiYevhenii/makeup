import { FC, useState } from 'react';
import { CrossIcon } from '../../assets/CrossIcon';
import './FilterMenu.scss';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { products } from '../../MockProducts';
import { FilterItem } from '../FilterItem/FilterItem';
import { useBlockVisibility } from '../../hooks/useBlockVisibility';
import { uniqueArray } from '../../helpers/uniqueArray';
import { handleFilterChange } from '../../helpers/handleFilterChange';

type Props = {
  isFilterMenuOpen: boolean,
  onClose: () => void,
  onBrandFilterChange: (brand: string[]) => void,
  onTypeFilterChange: (prodType: string[]) => void,
  handleClearFilter: () => void,
  handleApply: () => void,
}

export const FilterMenu: FC<Props> = ({
  isFilterMenuOpen,
  onClose,
  onBrandFilterChange,
  onTypeFilterChange,
  handleClearFilter,
  handleApply
}) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedType, setSelectedTypes] = useState<string[]>([]);
  const { isBrandBlockOpen, isTypeBlockOpen, handleOpenBlock } = useBlockVisibility();

  useDisableScroll('no-scroll', isFilterMenuOpen);

  const handleBrandFilterChange = (brand: string) => {
    handleFilterChange(brand, selectedBrands, onBrandFilterChange, setSelectedBrands);
  };

  const handleTypeFilterChange = (type: string) => {
    handleFilterChange(type, selectedType, onTypeFilterChange, setSelectedTypes);
  };

  const uniqueType = uniqueArray(products, 'productType')

  const uniqueBrands = uniqueArray(products, 'brand');

  const clearFilters = () => {
    // setSelectedBrands([]);
    // setSelectedTypes([]);
    handleClearFilter();
  };

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
            <span className='filter-menu__after'>{isBrandBlockOpen ? '+' : '-'}</span>
          </div>
          <FilterItem
            isBlockOpen={isBrandBlockOpen}
            handleFilterChange={handleBrandFilterChange}
            filterItems={uniqueBrands}
            selectedfilter={selectedBrands}
          />
          <div className="filter-menu__name" onClick={() => handleOpenBlock('type')}>
            <div className='filter-menu__category'>Type</div>
            <span className='filter-menu__after'>{isTypeBlockOpen ? '+' : '-'}</span>
          </div>
          <FilterItem
            isBlockOpen={isTypeBlockOpen}
            handleFilterChange={handleTypeFilterChange}
            filterItems={uniqueType}
            selectedfilter={selectedType}
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
