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
import { ClearFilterButton } from "../../components/ClearButton/ClearButton";

export const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOptions | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    selectedBrand: [] as string[],
    selectedType: [] as string[],
  });

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
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      selectedBrand: brands,
    }));

    setSearchParams(
      getSearchWith(searchParams, {
        brand: brands.length > 0 ? brands.join(',') : null,
      })
    );
  };

  const handleTypeFilterChange = (types: string[]) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      selectedType: types,
    }));

    setSearchParams(
      getSearchWith(searchParams, {
        types: types.length > 0 ? types.join(',') : null,
      })
    );
  };

  const handleClearFilter = () => {
    setSelectedFilters({
      selectedBrand: [],
      selectedType: [],
    });

    setSearchParams(
      getSearchWith(searchParams, {
        types: null,
        brand: null,
        sortBy: sortOption || null,
      })
    );

    setIsFilterMenuOpen(false);
  };

  const hideSlider = !selectedFilters.selectedBrand.length || !selectedFilters.selectedType;

  return (
    <div className="categories">
      <FilterMenu
        handleApply={() => setIsFilterMenuOpen(false)}
        isFilterMenuOpen={isFilterMenuOpen}
        onClose={closeFilterMenu}
        onBrandFilterChange={handleBrandFilterChange}
        onTypeFilterChange={handleTypeFilterChange}
        handleClearFilter={handleClearFilter}
      />
      <div className="categories__content">
        {Object.values(selectedFilters).some((filter) => filter.length > 0) && (
          <ClearFilterButton onClick={handleClearFilter} />
        )}
        <FilterButtons
          onSortOpen={handleSortMenu}
          onFiltersOpen={handleFilterMenu}
        />
        {isSortMenuOpen && (
          <SortMenu
            onClose={closeSortMenu}
            onSort={handleSort}
            isSortMenuOpen={isSortMenuOpen}
            selectedSortOption={sortOption}
          />
        )}
        {hideSlider && <SliderMain />}
        <ProductCardList
          sortOptions={sortOption}
          filteredBrand={selectedFilters.selectedBrand}
          filteredType={selectedFilters.selectedType}
        />
      </div>
    </div>
  );
};
