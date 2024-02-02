import { FC, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FilterButtons } from "../../components/FilterButtons/FilterButtons";
import cn from 'classnames';
import { SortMenu } from "../../components/SortMenu/SortMenu";
import { SortOptions } from "../../utils/sortOptions";
import { SliderMain } from "../../components/SliderMain/SLiderMain";
import { getSearchWith } from "../../helpers/getSearchWith";
import { FilterMenu } from "../../components/FilterMenu/FilterMenu";
import { ProductCardList } from "../../components/ProductComponents/ProductCardList/ProductCardList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearFilters, setBrandFilter, setSexFilter, setTypeFilter } from "../../app/slices/filterSlice";
import { ClearFilterButton } from "../../components/ClearButton/ClearButton";
import { SelectedFilters } from "../../components/SelectedFilters/SelectedFilters";
import { FilterRemove } from "../../helpers/handleFilterRemove";
import { DesktopSortOptionsAndQuantity } from "../../components/DesktopSortOptionsAndQuantity/DesktopSortOptionsAndQuantity";
import { TotalAmountOfProducts } from "../../components/TotalAmountOfProducts/TotalAmountOfProducts";
import { CategoryTitle } from "../../components/CategoryTitle/CategoryTitle";
import { Breadcrums } from "../../components/BreadCrumbs/BreadCrumbs";
import { PaginationRounded } from "../../components/Pagination/Pagination";
import { IProd } from "../../types/IProduct";
import './CatalogPageWrapper.scss';

type Props = {
  products: IProd[] | undefined,
  amountOfPages: number | undefined,
  onPageChange: (page: number) => void,
  totalProducts: number | undefined
}

export const CatalogPageWrapper: FC<Props> = ({
  products,
  amountOfPages,
  onPageChange,
  totalProducts
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOptions | null>(null);
  const { brands, types, sex } = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const typeParam = searchParams.get('type');
    const brandParam = searchParams.get('brand');
    const sexParam = searchParams.get('sex');

    dispatch(setBrandFilter(brandParam ? brandParam.split(',') : []));
    dispatch(setTypeFilter(typeParam ? typeParam.split(',') : []));
    dispatch(setSexFilter(sexParam ? sexParam.split(',') : []))
  }, [dispatch, searchParams]);

  useEffect(() => {
    setSearchParams(getSearchWith(searchParams, {
      type: types.length > 0 ? types.join(',') : null,
      brand: brands.length > 0 ? brands.join(',') : null,
      sex: sex.length > 0 ? sex.join(',') : null,
      sortBy: sortOption || null,
    }));
  }, [types, brands, sex, sortOption, searchParams, setSearchParams]);

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

  const hideSlider = brands.length > 0 || types.length > 0 || sex.length > 0;

  const handleFilterRemove = (filter: string) => {
    FilterRemove(filter, brands, types, sex, dispatch);
  };

  const categoryName = products?.map(product => product.categories.map(pr => pr.name)[0])[0];

  const pageTitle = location.pathname === '/makeup/search' ? 'Search products' : categoryName;

  return (
    <div className="categories">
      <div className="categories__top">
        {location.pathname !== '/makeup/search' && (
          <Breadcrums
            renderOptions={() =>
              <Link className='breadcrumbs__item breadcrumbs__item--active' to={location.pathname}>
                {categoryName}
              </Link>
            }
          />
        )}
        <CategoryTitle categoryTitle={pageTitle} />
      </div>
      <div className="categories__container">
        <FilterMenu
          products={products}
          handleApply={() => setIsFilterMenuOpen(false)}
          isFilterMenuOpen={isFilterMenuOpen}
          onClose={closeFilterMenu}
          clearFilters={handleClearFilter}
        />
        <div className="categories__content">
          <div className={cn("categories__utils", { 'hide-slide': hideSlider })}>
            <div className="categories__desktop-head">
              <SelectedFilters onFilterRemove={handleFilterRemove} filters={[...brands, ...types, ...sex]} />
              {hideSlider && <ClearFilterButton onClick={handleClearFilter} />}
            </div>
            <div className="categories__sort-amount">
              <TotalAmountOfProducts totalCount={totalProducts} />
              <DesktopSortOptionsAndQuantity
                handleSort={handleSort}
                selectedSortOption={sortOption}
                isSortMenuOpen={isSortMenuOpen}
                handleOpen={handleSortMenu}
              />
            </div>
          </div>
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
            products={products}
            sortOptions={sortOption}
            filteredBrand={brands}
            filteredType={types}
            filteredSex={sex}
          />
          <div className="categories__pagination">
            <PaginationRounded pageNumber={amountOfPages} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
