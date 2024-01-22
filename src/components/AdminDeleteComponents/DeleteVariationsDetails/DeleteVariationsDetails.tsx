import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form"
import { GET_ALL_PRODUCTS_ID_NAME, QueryGetAllProductsIdName } from "../../../graphql/queries/getById/getAllProductNameAndId";
import { IProd } from "../../../types/IProduct";
import { MutationsDeleteVariationsDetails } from "../../../graphql/mutations/DeleteMutation/deleteVariationsDetails";
import { DELETE_VARIATIONS_DETAILS } from "../../../graphql/mutations/DeleteMutation/deleteVariationsDetails";
import { AdminSelectWithLabel } from "../../AdminUI/AdminSelectWithLabel/AdminSelectWithLabel";
import { SuccessMessage } from "../../SuccessPopup/SuccessPopup";

export const DeleteVariationDetailsComponent = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();
  const [successMessage, setSuccessMessage] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedProductVariation, setSelectedProductVariation] = useState<string>('');
  const [selectedVariationDetail, setSelectedVariationDetail] = useState('');

  const { data } = useQuery<QueryGetAllProductsIdName>(GET_ALL_PRODUCTS_ID_NAME);
  const products = data?.getAllProducts;

  const [deleteVariationDetails, { error }] = useMutation<MutationsDeleteVariationsDetails>(DELETE_VARIATIONS_DETAILS);

  const handleSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await deleteVariationDetails({
        variables: {
          variationDetailsId: +selectedVariationDetail
        }
      });

      console.log('Succesfully deleted variationDetail', result)
      handleSuccessMessage();
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

  const handleVariationDetail = (variationDetailId: string) => {
    setSelectedVariationDetail(variationDetailId);
  
    const selectedProduct = products?.find((prod) => prod.id === +selectedProductId);
    const selectedVariation = selectedProduct?.productVariations.find(
      (variation) => variation.id === +selectedProductVariation
    );
  
    const selectedVariationDetail = selectedVariation?.variationDetails.find(
      (detail) => detail.id === +variationDetailId
    );

    console.log(selectedVariationDetail)
  
    if (selectedVariationDetail) {
      setValue('variationDetailsId', selectedVariationDetail.id);
    }
  };

  return (
    <div>
      <div className="admin">
        <div className="admin-input">
          {successMessage && <SuccessMessage message="Variation details deleted successfully" error={error} />}
          <label className="admin-input__label">Product name</label>
          <select onChange={(e) => handleProductChange(e.target.value)} className="admin-input__input">
            {products?.map(prod => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-input">
          <label className="admin-input__label">Product name</label>
          <select onChange={(e) => handleProductVariationChange(e.target.value)} className="admin-input__input">
            {products
              ?.find((prod) => prod.id === +selectedProductId)
              ?.productVariations.map((variation) => (
                <option key={variation.id} value={variation.id}>
                  {variation.variationName}
                </option>
              ))}
          </select>
        </div>

        <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
          <div>
          <AdminSelectWithLabel
              label="Variation detail"
              name='variationDetailsId'
              register={register}
              value={selectedVariationDetail}
              onChange={(e) => handleVariationDetail(e.target.value)}
              renderOptions={() =>
                products
                  ?.find((prod) => prod.id === +selectedProductId)
                  ?.productVariations
                  .find((variation) => variation.id === +selectedProductVariation)
                  ?.variationDetails.map((detail) => (
                    <option key={detail.id} value={detail.id}>
                      {detail.price}
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