import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { CatalogPageWrapper } from "../../components/CatalogPageWrapper/CatalogPageWrapper";
import { GET_PRODUCT_WITH_CATEGORY_IDS_PAGED, QueryProductWithCategoryId } from "../../graphql/queries/getById/getProductsWithCetgoryId";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { amountOfPages } from "../../helpers/getAmountsOfPage";
import { setProducts } from "../../app/slices/productSlice";
import { QueryComponent } from "../../components/QueryComponent/QueryComponent";

export const CategoriesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const pageParam = new URLSearchParams(location.search).get('page');
  const initialPage = pageParam ? parseInt(pageParam) - 1 : 0;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, loading, error } = useQuery<QueryProductWithCategoryId>(GET_PRODUCT_WITH_CATEGORY_IDS_PAGED, {
    variables: {
      categoryIds: id,
      pageRequestDTO: {
        pageNumber: currentPage,
        sizePerPage: 6,
      },
    }
  });

  useEffect(() => {
    if (data && data.getProductsByCategoryIdsPaged) {
      setProducts(data.getProductsByCategoryIdsPaged);
    }
  }, [data]);

  useEffect(() => {
    navigate(`${location.pathname}?page=${currentPage + 1}`);
  }, [currentPage, navigate, location.pathname]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const amountPages = amountOfPages(data?.getProductsByCategoryIdsPaged.total, 6);

  return (
    <QueryComponent
      isLoading={loading}
      error={error}
      errorMessage={error?.message}
    >
      <CatalogPageWrapper
        products={data?.getProductsByCategoryIdsPaged.content}
        onPageChange={handlePageChange}
        amountOfPages={amountPages}
        totalProducts={data?.getProductsByCategoryIdsPaged?.total}
      />
    </QueryComponent>
  )
}
