import { useMutation, useQuery } from "@apollo/client";
import { ADD_PRODUCT } from "../../graphql/mutations/addProduct";
import { IProd } from "../../types/IProduct";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_ALL_PRODUCTS } from "../../graphql/queries/getAllProducts";
import { AdminInpuWithLabel } from "../AdminInputWithLabel/AdminInputWithLabel";
import { AdminSelectWithLabel } from "../AdminSelectWithLabel/AdminSelectWithLabel";
import './AddProductForm.scss';
import { GET_ALL_BRANDS, QueryAllBrands } from "../../graphql/queries/getAllBrand";
import { GET_ALL_CATEGORIES, QueryGetAllCategories } from "../../graphql/queries/getAllCategories";
import { GET_ALL_COUNTRIES, getAllCountries } from "../../graphql/queries/getAllCountries";
import { GET_ALL_CLASSIFICATIONS, QueryAllClassifications } from "../../graphql/queries/getAllClassifications";
import { GET_ALL_SEXES, QueryAllSexes } from "../../graphql/queries/getAllSexes";
import { QueryGetAllProducts } from "../../graphql/queries/getAllProducts";

interface MutationData {
  addProduct: IProd;
}

export const AddProductForm = () => {
  const { register, handleSubmit } = useForm<IProd>()
  const [addProduct] = useMutation<MutationData>(ADD_PRODUCT);

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
          label="Sex"
          name='sex'
          register={register}
          renderOptions={() =>
            sexes?.map((sexType) => (
              <option key={sexType} value={sexType}>
                {sexType}
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
                {classItem}
              </option>
            ))
          }
        />
        <button className="admin__button">Submit</button>
      </form>
    </div>
  );
};
