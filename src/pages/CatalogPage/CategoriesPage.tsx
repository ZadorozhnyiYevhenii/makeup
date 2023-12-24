import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterButtons } from "../../components/FilterButtons/FilterButtons";
import './CategoriesPage.scss';
import { SortMenu } from "../../components/SortMenu/SortMenu";
import { SortOptions } from "../../utils/sortOptions";
import { SliderMain } from "../../components/SliderMain/SLiderMain";
import { getSearchWith } from "../../helpers/getSearchWith";
import { FilterMenu } from "../../components/FilterMenu/FilterMenu";
import { ProductCardList } from "../../components/ProductCardList/ProductCardList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearFilters, setBrandFilter, setTypeFilter } from "../../app/slices/filterSlice";
import { ClearFilterButton } from "../../components/ClearButton/ClearButton";
import { SelectedFilters } from "../../components/SelectedFilters/SelectedFilters";
import { FilterRemove } from "../../helpers/handleFilterRemove";
import { DesktopSortOptionsAndQuantity } from "../../components/DesktopSortOptionsAndQuantity/DesktopSortOptionsAndQuantity";
import { TotalAmountOfProducts } from "../../components/TotalAmountOfProducts/TotalAmountOfProducts";
import { calculateTotalProductsCount } from "../../helpers/calculateTotalProductsCount";
import { products } from "../../MockProducts";

export const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOptions | null>(null);
  const { brands, types } = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const typeParam = searchParams.get('type');
    const brandParam = searchParams.get('brand');

    dispatch(setBrandFilter(brandParam ? brandParam.split(',') : []));
    dispatch(setTypeFilter(typeParam ? typeParam.split(',') : []));
  }, [dispatch, searchParams]);

  useEffect(() => {
    setSearchParams(getSearchWith(searchParams, {
      type: types.length > 0 ? types.join(',') : null,
      brand: brands.length > 0 ? brands.join(',') : null,
      sortBy: sortOption || null,
    }));
  }, [types, brands, sortOption, searchParams, setSearchParams]);

  const handleSortMenu = () => {
    setIsSortMenuOpen((prev) => !prev);
  };

  const handleFilterMenu = () => {
    setIsFilterMenuOpen((prev) => !prev);
  };

  const handleSort = (sortBy: SortOptions) => {
    setSortOption(sortBy);
    setIsSortMenuOpen(false);
  };

  const closeSortMenu = () => setIsSortMenuOpen(false);
  const closeFilterMenu = () => setIsFilterMenuOpen(false);

  const handleClearFilter = () => {
    dispatch(clearFilters())
    setIsFilterMenuOpen(false);
  };

  const hideSlider = brands.length > 0 || types.length > 0;

  const handleFilterRemove = (filter: string) => {
    FilterRemove(filter, brands, types, dispatch);
  };

  const amountOfProducts = calculateTotalProductsCount(products, brands, types)

  return (
    <div className="categories">
      <FilterMenu
        handleApply={() => setIsFilterMenuOpen(false)}
        isFilterMenuOpen={isFilterMenuOpen}
        onClose={closeFilterMenu}
        clearFilters={handleClearFilter}
      />
      <div className="categories__content">
        {hideSlider && (
          <div className="categories__utils">
            <div className="categories__desktop-head">
              <SelectedFilters onFilterRemove={handleFilterRemove} filters={[...brands, ...types]} />
              {hideSlider && <ClearFilterButton onClick={handleClearFilter} />}
            </div>
            <div className="categories__sort-amount">
              <TotalAmountOfProducts totalCount={amountOfProducts} />
              <DesktopSortOptionsAndQuantity
                handleSort={handleSort}
                selectedSortOption={sortOption}
                isSortMenuOpen={isSortMenuOpen}
                handleOpen={handleSortMenu}
              />
            </div>

          </div>
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
        {!hideSlider && <SliderMain />}
        <ProductCardList
          sortOptions={sortOption}
          filteredBrand={brands}
          filteredType={types}
        />
      </div>
    </div>
  );
};
