import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CatalogPageWrapper } from "../../components/CatalogPageWrapper/CatalogPageWrapper";
import { QuerySearchProducts, SEARCH_PRODUCTS } from "../../graphql/queries/getAll/searchProducts";
import { useAppSelector } from "../../app/hooks";
import { amountOfPages } from "../../helpers/getAmountsOfPage";
import { QueryComponent } from "../../components/QueryComponent/QueryComponent";

export const SearchedPage = () => {
  const { searchString } = useAppSelector(state => state.search);
  const navigate = useNavigate();
  const location = useLocation();

  const pageParam = new URLSearchParams(location.search).get('page');
  const initialPage = pageParam ? parseInt(pageParam) - 1 : 0;

  const [pageCounts, setPageCounts] = useState(initialPage);

  const { data, loading, error } = useQuery<QuerySearchProducts>(SEARCH_PRODUCTS, {
    variables: {
      pageRequestDTO: {
        pageNumber: pageCounts,
        sizePerPage: 6,
      },
      searchString: searchString
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get('query');

    if (pageCounts > 0) {
      queryParams.set('page', (pageCounts + 1).toString());
    } else {
      queryParams.delete('page');
    }

    queryParams.set('query', queryParam || searchString);

    const newUrl = `?${queryParams.toString()}`;

    navigate({
      pathname: location.pathname,
      search: newUrl,
    });
  }, [pageCounts, navigate, location.pathname, location.search, searchString]);

  const handlePageChange = (page: number) => {
    setPageCounts(page - 1);
  };

  const amounOfProducts = amountOfPages(data?.searchProductsPaged?.total, 6);

  return (
    <QueryComponent
      isLoading={loading}
      error={error}
      errorMessage={error?.message}
    >
      <CatalogPageWrapper
        products={data?.searchProductsPaged?.content}
        amountOfPages={amounOfProducts}
        onPageChange={handlePageChange}
        totalProducts={data?.searchProductsPaged?.total}
      />
    </QueryComponent>
  );
};
