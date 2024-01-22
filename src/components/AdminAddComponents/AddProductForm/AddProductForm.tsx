import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import './AddProductForm.scss';
import { IProd } from "../../../types/IProduct";
import { ADD_PRODUCT } from "../../../graphql/mutations/AddMutations/addProduct";
import { GET_ALL_SEXES, QueryAllSexes } from "../../../graphql/queries/getAll/getAllSexes";
import { GET_ALL_CLASSIFICATIONS, QueryAllClassifications } from "../../../graphql/queries/getAll/getAllClassifications";
import { GET_ALL_COUNTRIES, getAllCountries } from "../../../graphql/queries/getAll/getAllCountries";
import { GET_ALL_CATEGORIES, QueryGetAllCategories } from "../../../graphql/queries/getAll/getAllCategories";
import { GET_ALL_BRANDS, QueryAllBrands } from "../../../graphql/queries/getAll/getAllBrand";
import { GET_ALL_PRODUCTS, QueryGetAllProducts } from "../../../graphql/queries/getAll/getAllProducts";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { AdminSelectWithLabel } from "../../AdminUI/AdminSelectWithLabel/AdminSelectWithLabel";
import { GET_PRODUCT_STATUS, QueryProductStatus } from "../../../graphql/queries/getAll/getProductStatus";
import { normalizeName } from "../../../helpers/normalizeWord";

interface MutationData {
  addProduct: IProd;
}

export const AddProductForm = () => {
  const { register, handleSubmit, reset } = useForm<IProd>()
  const [addProduct] = useMutation<MutationData>(ADD_PRODUCT);

  const { data: productStatusesData } = useQuery<QueryProductStatus>(GET_PRODUCT_STATUS);
  const productStatuses = productStatusesData?.getAllProductStatuses;

  const { data: sexesResponce } = useQuery<QueryAllSexes>(GET_ALL_SEXES);
  const sexes = sexesResponce?.getAllSexes;

  const { data: classificationResponce } = useQuery<QueryAllClassifications>(GET_ALL_CLASSIFICATIONS);
  const classifications = classificationResponce?.getAllClassifications;

  const { data: countriesResponce } = useQuery<getAllCountries>(GET_ALL_COUNTRIES);
  const countries = countriesResponce?.getAllCountries;

  const { data: categoriesResponce } = useQuery<QueryGetAllCategories>(GET_ALL_CATEGORIES);
  const categories = categoriesResponce?.getAllCategories;

  const { data } = useQuery<QueryAllBrands>(GET_ALL_BRANDS);
  const brands = data?.getAllBrands;

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      data.imageLinks = Array.isArray(data.imageLinks)
        ? data.imageLinks
        : data.imageLinks
          ? [data.imageLinks]
          : [];

      data.imageLinks = data.imageLinks.map((image) => image.split(', '))[0];

      const { data: result } = await addProduct({
        variables: {
          product: data,
        },
        update: (cache, { data: addProductData }) => {
          const existingProducts = cache.readQuery<QueryGetAllProducts>({
            query: GET_ALL_PRODUCTS,
          });

          if (existingProducts && addProductData) {
            const newProduct = addProductData.addProduct;
            cache.writeQuery<QueryGetAllProducts>({
              query: GET_ALL_PRODUCTS,
              data: {
                getAllProducts: [...existingProducts.getAllProducts, newProduct],
              },
            });
          }
        },
      });

      console.log('Product added:', result?.addProduct);
      reset();
      alert('Product added!');
    } catch (error) {
      console.error('Add product error:', error);
    }
  };

  return (
    <div className="admin">
      <form onSubmit={handleSubmit(onSubmit)} className="admin__form">
        <AdminInpuWithLabel label="Product name" name='name' register={register} />
        <AdminSelectWithLabel
          label="Brand"
          name='brandId'
          register={register}
          renderOptions={() =>
            brands?.map((brand) => (
              <option
                key={brand.id}
                value={brand.id}
              >
                {brand.name}
              </option>
            ))
          }
        />
        <AdminSelectWithLabel
          label="Category"
          name='categoryIds'
          register={register}
          renderOptions={() =>
            categories?.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))
          }
        />
        <AdminSelectWithLabel
          label="Country trade mark in"
          name='countryTradeMarkId'
          register={register}
          renderOptions={() =>
            countries?.map((country) => (
              <option
                key={country.id}
                value={country.id}
              >
                {country.name}
              </option>
            ))
          }
        />
        <AdminSelectWithLabel
          label="Countries made in"
          name='countriesMadeInIds'
          register={register}
          renderOptions={() =>
            countries?.map((country) => (
              <option
                key={country.id}
                value={country.id}
              >
                {country.name}
              </option>
            ))
          }
        />
        <AdminInpuWithLabel label="Description" name='description' register={register} />
        <AdminInpuWithLabel label="Product group" name='productGroup' register={register} />
        <AdminInpuWithLabel label="Links for image" name='imageLinks' register={register} />
        <AdminSelectWithLabel
          label="Availability"
          name='productStatus'
          register={register}
          renderOptions={() =>
            productStatuses?.map(status => (
              <option value={status} key={status}>
                {normalizeName(status)}
              </option>
            ))
          }
        />
        <AdminSelectWithLabel
          label="Sex"
          name='sex'
          register={register}
          renderOptions={() =>
            sexes?.map((sexType) => (
              <option key={sexType} value={sexType}>
                {normalizeName(sexType)}
              </option>
            ))
          }
        />
        <AdminSelectWithLabel
          label="Classification"
          name='classification'
          register={register}
          renderOptions={() =>
            classifications?.map((classItem) => (
              <option key={classItem} value={classItem}>
                {normalizeName(classItem)}
              </option>
            ))
          }
        />
        <button className="admin__button">Submit</button>
      </form>
    </div>
  );
};
