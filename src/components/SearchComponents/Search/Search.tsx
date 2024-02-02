import React, { useEffect, useState } from "react";
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
import { useAppDispatch } from "../../../app/hooks";
import { setSearchString } from "../../../app/slices/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";
import './Search.scss';

type Props = {
  onCross: () => void,
  toggledIcon: boolean
}

export const SearchBar: React.FC<Props> = ({ onCross, toggledIcon }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { register } = useForm<ISearch>();

  const [searchData, setSearchData] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useAppDispatch();

  const { data, error, loading } = useQuery<QuerySearchProducts>(SEARCH_PRODUCTS, {
    variables: {
      pageRequestDTO: {
        pageNumber: pageNumber,
        sizePerPage: 6,
      },
      searchString: searchData
    },
  });

  const totalPages = data?.searchProductsPaged?.total;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    setSearchData(searchString);
    setPageNumber(0);
  };

  const onBtnClick = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('query', searchData);

    navigate({
      pathname: '/makeup/search',
      search: queryParams.toString(),
    });

    onCross();
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const queryParam = urlSearchParams.get('query');
  
    if (queryParam) {
      setSearchData(queryParam);
      dispatch(setSearchString(queryParam));
    }
  }, [location.search]);  

  const handleSearchWithDebounce = debounce(handleSearch, 500);

  const ruleForOpening = (data?.searchProductsPaged?.content.length !== undefined
    ? data.searchProductsPaged.content.length
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
        </div>
        <div className={cn('search__wrapper', { 'search__wrapper--active': ruleForOpening })}>
          <h3 className="search__title">Products</h3>
          {error && (<div>{error.message}</div>)}
          {loading ? (
            <Loader />
          ) : (
            <ul className="search__items">
              {data?.searchProductsPaged?.content.map(product => (
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
          {totalPages && totalPages > 6 && (
            <button type="button" className="search__button" onClick={onBtnClick}>
              Load more
            </button>
          )}
        </div>
      </div>
    </>
  );
};
