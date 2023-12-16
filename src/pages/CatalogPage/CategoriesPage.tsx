import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterButtons } from "../../components/FilterButtons/FilterButtons";

import './CategoriesPage.scss';
import { SortMenu } from "../../components/SortMenu/SortMenu";
import { SortOptions } from "../../utils/sortOptions";
import { SliderMain } from "../../components/SliderMain/SLiderMain";
import { getSearchWith } from "../../helpers/getSearchWith";
import { FilterMenu } from "../../components/FilterMenu/FilterMenu";
import { ProductCardList } from "../../components/ProductCardList/ProductCardList";

export const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOptions | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  const handleSortMenu = () => {
    setIsSortMenuOpen((prev) => !prev);
  };

  const handleFilterMenu = () => {
    setIsFilterMenuOpen((prev) => !prev);
  };

  const handleSort = (sortBy: SortOptions) => {
    setSortOption(sortBy);
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          sortBy: sortBy || null,
        }
      )
    )
    setIsSortMenuOpen(false);
  };

  const closeSortMenu = () => setIsSortMenuOpen(false);

  const closeFilterMenu = () => setIsFilterMenuOpen(false);

  const handleBrandFilterChange = (brands: string[]) => {
    setSelectedBrand(brands);
    
    setSearchParams(
      getSearchWith(searchParams, {
        brand: brands.length > 0 ? brands.join(',') : null,
      })
    );
  };

  const handleTypeFilterChange = (types: string[]) => {
    setSelectedType(types);
    
    setSearchParams(
      getSearchWith(searchParams, {
        types: types.length > 0 ? types.join(',') : null,
      })
    );
  };
  
  return (
    <div className="categories">
      <FilterButtons onSortOpen={handleSortMenu} onFiltersOpen={handleFilterMenu} />
        <FilterMenu
          isFilterMenuOpen={isFilterMenuOpen}
          onClose={closeFilterMenu}
          onBrandFilterChange={handleBrandFilterChange}
          onTypeFilterChange={handleTypeFilterChange}
        />
      {isSortMenuOpen && (
        <SortMenu
          onClose={closeSortMenu}
          onSort={handleSort}
          isSortMenuOpen={isSortMenuOpen}
          selectedSortOption={sortOption}
        />
      )}
      <SliderMain />
      <ProductCardList sortOptions={sortOption} filteredBrand={selectedBrand} filteredType={selectedType}/>
    </div>
  );
};
