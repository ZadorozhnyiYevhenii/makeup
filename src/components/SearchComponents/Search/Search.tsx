import React, { useState } from "react";
import { useForm } from "react-hook-form";
import cn from 'classnames';
import { SearchIconHeader } from "../../../assets/SearchIcon";
import { CrossIcon } from "../../../assets/CrossIcon";
import { useQuery } from "@apollo/client";
import { QuerySearchProducts, SEARCH_PRODUCTS } from "../../../graphql/queries/getAll/searchProducts";
import { ISearch } from "../../../types/ISearch";
import { SearchItem } from "../SeachItem/SearchItem";
import { debounce } from "../../../helpers/debounce";
import { Loader } from "../../Loader/Loader";
import './Search.scss';

type Props = {
  onCross: () => void,
  toggledIcon: boolean
}

export const SearchBar: React.FC<Props> = ({ onCross, toggledIcon }) => {
  const { register } = useForm<ISearch>();
  const [searchData, setSearchData] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const { data, error, loading, fetchMore } = useQuery<QuerySearchProducts>(SEARCH_PRODUCTS, {
    variables: {
      pageRequestDTO: {
        pageNumber: 0,
        sizePerPage: 6,
      },
      searchString: searchData
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    setSearchData(searchString);
    setPageNumber(0);
  };

  const handleSearchWithDebounce = debounce(handleSearch, 500);

  const loadMore = () => {
    fetchMore({
      variables: {
        pageRequestDTO: {
          pageNumber: pageNumber + 1,
          sizePerPage: 6,
        },
        searchString: searchData
      },
    }).then(() => {
      setPageNumber(pageNumber + 1);
    });
  };

  const ruleForOpening = (data?.searchProductsPaged?.length !== undefined
    ? data.searchProductsPaged.length
    : 0
  ) > 0;


  return (
    <>
      <div className={cn('search', { 'search--active': !!data?.searchProductsPaged })}>
        <div className="search__container">
          <div className={cn("search__icon", { 'search__icon--active': toggledIcon })}>
            <SearchIconHeader />
          </div>
          <input
            type="text"
            className="search__input"
            placeholder="More than 100 000 goods"
            {...register('searchString')}
            onChange={handleSearchWithDebounce}
          />
          <div onClick={onCross} className={cn("search__cross", { "search__cross--active": toggledIcon })}>
            <CrossIcon />
          </div>
          {error && (<div>{error.message}</div>)}
        </div>
        <div className={cn('search__wrapper', { 'search__wrapper--active': ruleForOpening })}>
          <h3 className="search__title">Products</h3>
          {loading ? (
            <Loader />
          ) : (
            <ul className="search__items">
              {data?.searchProductsPaged?.map(product => (
                <li key={product.id}>
                  <SearchItem
                    id={product.id}
                    product={product}
                    onClose={onCross}
                  />
                </li>
              ))}
            </ul>
          )}
          {data?.searchProductsPaged?.length && data.searchProductsPaged.length >= 6 && (
            <button type="button" className="search__button" onClick={loadMore}>
              Load more
            </button>
          )}
        </div>
      </div>
    </>
  );
};
