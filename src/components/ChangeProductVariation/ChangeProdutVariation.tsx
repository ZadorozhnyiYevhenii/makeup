import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form"
import { CHANGE_PRODUCT_VARIATION, MutationChangeProductVariation } from "../../graphql/mutations/changeProductVariation";
import { IProd } from "../../types/IProduct";
import { AdminInpuWithLabel } from "../AdminInputWithLabel/AdminInputWithLabel";
import { GET_ALL_PRODUCTS_ID_NAME } from "../../graphql/queries/getAllProductNameAndId";
import { QueryGetAllProductsIdName } from "../../graphql/queries/getAllProductNameAndId";
import { useState } from "react";
import { AdminSelectWithLabel } from "../AdminSelectWithLabel/AdminSelectWithLabel";

export const ChangeProductVariation = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedProductVariation, setSelectedProductVariation] = useState<string>('');

  const { data } = useQuery<QueryGetAllProductsIdName>(GET_ALL_PRODUCTS_ID_NAME);

  const products = data?.getAllProducts;

  const [updatedProductVariation] = useMutation<MutationChangeProductVariation>(CHANGE_PRODUCT_VARIATION);

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await updatedProductVariation({
        variables: {
          productVariationId: +selectedProductVariation,
          updatedProductVariation: {
            imageLink: data.imageLink,
            productId: +selectedProductId,
            variationName: data.variationName,
          },
        },
      });

      console.log('Updated product variation', result?.updatedProductVariation);
      alert('Updated product variation');
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);

    const selectedProduct = products?.find((prod) => prod.id === +productId);

    if (selectedProduct) {
      setValue('productId', selectedProduct.id);
      setValue('imageLink', selectedProduct.imageLink);
      setValue('variationName', selectedProduct.variationName);
    }
  };

  const handleProductVariationChange = (variationId: string) => {
    setSelectedProductVariation(variationId);
  
    const selectedProduct = products?.find((prod) => prod.id === +selectedProductId);
  
    const selectedVariation = selectedProduct?.productVariations.find(
      (variation) => variation.id === +variationId
    );
  
    if (selectedVariation) {
      setValue('imageLink', selectedVariation.variationImage.imageLink);
      setValue('variationName', selectedVariation.variationName);
    }
  };

  console.log(selectedProductVariation)

  return (
    <div className="admin">
      <div className="admin-input">
        <label className="admin-input__label">Product name</label>
        <select onChange={(e) => handleProductChange(e.target.value)} className="admin-input__input">
          {products?.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>
      <form className="admin__form" onSubmit={handleSubmit(onSubmit)}>
        {selectedProductId && (
          <AdminSelectWithLabel
            label="Product Variation"
            name="productVariationId"
            register={register}
            value={selectedProductVariation}
            onChange={(e) => handleProductVariationChange(e.target.value)}
            renderOptions={() =>
              products
                ?.find((prod) => prod.id === +selectedProductId)
                ?.productVariations.map((variation) => (
                  <option key={variation.id} value={variation.id}>
                    {variation.variationName}
                  </option>
                ))
            }
          />
        )}
        <div style={{ display: 'none' }}>
          <AdminInpuWithLabel label="Product id" name="productId" register={register} />
        </div>
        <AdminInpuWithLabel label="Image link" name="imageLink" register={register} />
        <AdminInpuWithLabel label="Variation name" name="variationName" register={register} />
        <button className="admin__button">Submit</button>
      </form>
    </div>
  );
};
