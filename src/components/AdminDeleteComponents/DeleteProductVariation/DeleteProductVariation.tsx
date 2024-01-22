import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react";
import { IProd } from "../../../types/IProduct";
import { GET_ALL_PRODUCTS_ID_NAME, QueryGetAllProductsIdName } from "../../../graphql/queries/getById/getAllProductNameAndId";
import { DELETE_PRODUCT_VARIATION, MutationDeleteProductVariation } from "../../../graphql/mutations/DeleteMutation/deleteProductVariation";
import { AdminSelectWithLabel } from "../../AdminUI/AdminSelectWithLabel/AdminSelectWithLabel";
import { SuccessMessage } from "../../SuccessPopup/SuccessPopup";

export const DeleteProductVariationComponent = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();
  const [successMessage, setSuccessMessage] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedProductVariation, setSelectedProductVariation] = useState<string>('');

  const { data } = useQuery<QueryGetAllProductsIdName>(GET_ALL_PRODUCTS_ID_NAME);
  const products = data?.getAllProducts;

  const [deleteProductVariation, { error }] = useMutation<MutationDeleteProductVariation>(DELETE_PRODUCT_VARIATION);

  const handleSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await deleteProductVariation({
        variables: {
          productVariationId: +selectedProductVariation
        }
      });

      console.log('Succesfully deleted country', result)
      handleSuccessMessage()
    } catch (error) {
      console.error(error);
      handleSuccessMessage();
    }
  }

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);

    const chosenProduct = products?.find(product => product.id === +productId);

    console.log(chosenProduct);

    if (chosenProduct) {
      setValue('productId', chosenProduct.id);
    }
  }

  const handleProductVariationChange = (variationId: string) => {
    setSelectedProductVariation(variationId);

    const selectedProduct = products?.find((prod) => prod.id === +selectedProductId);

    const selectedVariation = selectedProduct?.productVariations.find(
      (variation) => variation.id === +variationId
    );

    if (selectedVariation) {
      setValue('productVariationId', selectedVariation.id);
    }
  };

  console.log(selectedProductVariation)

  return (
    <div>
      <div className="admin">
        <div className="admin-input">
          {successMessage && <SuccessMessage message="Product variation deleted successfully" error={error} />}
          <label className="admin-input__label">Product name</label>
          <select onChange={(e) => handleProductChange(e.target.value)} className="admin-input__input">
            {products?.map(prod => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>
        </div>

        <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
          <div>
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
          </div>
          <button className="admin__button">Delete</button>
        </form>
      </div>
    </div>
  )
}