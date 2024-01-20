import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react";
import { IProd } from "../../../types/IProduct";
import { useMutation, useQuery } from "@apollo/client";
import { CHANGE_PRODUCT, MutationChangeProduct } from "../../../graphql/mutations/ChangeMutations/changeProduct";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { AdminSelectWithLabel } from "../../AdminUI/AdminSelectWithLabel/AdminSelectWithLabel";
import { GET_ALL_PRODUCTS, QueryGetAllProducts } from "../../../graphql/queries/getAll/getAllProducts";
import { GET_ALL_SEXES, QueryAllSexes } from "../../../graphql/queries/getAll/getAllSexes";
import { GET_ALL_CLASSIFICATIONS, QueryAllClassifications } from "../../../graphql/queries/getAll/getAllClassifications";
import { GET_ALL_COUNTRIES, getAllCountries } from "../../../graphql/queries/getAll/getAllCountries";
import { GET_ALL_CATEGORIES, QueryGetAllCategories } from "../../../graphql/queries/getAll/getAllCategories";
import { GET_ALL_BRANDS, QueryAllBrands } from "../../../graphql/queries/getAll/getAllBrand";

export const ChangeProduct = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();

  const [updateProduct] = useMutation<MutationChangeProduct>(CHANGE_PRODUCT);

  const [selectedProductId, setSelectedProductId] = useState<string>('')

  const { data: productsData } = useQuery<QueryGetAllProducts>(GET_ALL_PRODUCTS);

  const products = productsData?.getAllProducts;

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

      const { data: result } = await updateProduct({
        variables: {
          productId: +selectedProductId,
          updatedProduct: {
            brandId: data.brandId,
            categoryIds: data.categoryIds,
            countryTradeMarkId: data.countryTradeMarkId,
            countriesMadeInIds: data.countriesMadeInIds,
            classification: data.classification,
            description: data.description,
            imageLinks: data.imageLinks,
            name: data.name,
            productGroup: data.productGroup,
            sex: data.sex,
          },
        },
      });

      console.log('Updated Product', result?.updateProduct);
      alert('Updated Product')
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);

    const selectedProduct = products?.find((product) => product.id === +productId);

    if (selectedProduct) {
      setValue('productId', selectedProduct.id);
      setValue('brandId', selectedProduct.brand.id);
      setValue('categoryIds', selectedProduct.categories.map(category => category.id));
      setValue('countryTradeMarkId', selectedProduct.countryTradeMark.id);
      setValue('countriesMadeInIds', selectedProduct.countriesMadeIn.map(p => p.id));
      setValue('description', selectedProduct.description);
      setValue('productGroup', selectedProduct.productGroup);
      setValue('imageLinks', selectedProduct.images.map(image => image.imageLink));
      setValue('sex', selectedProduct.sex);
      setValue('classification', selectedProduct.classification);
      setValue('name', selectedProduct.name)
    }
  };

  return (
    <div className="admin">
        <div className="admin-input__container">
          <label className="admin-input__label">Product name</label>
          <select
            className="admin-input__input"
            onChange={(e) => handleProductChange(e.target.value)}
          >
            {products?.map(prod => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>
        </div>
      {selectedProductId && (
        <form className="admin__form" onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'none' }}>
            <AdminInpuWithLabel label="Product id" name='productId' register={register} />
          </div>
          <AdminInpuWithLabel label="name" name='name' register={register} />
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
      )}
    </div>
  )
}