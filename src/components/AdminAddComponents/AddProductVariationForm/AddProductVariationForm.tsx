import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { IProd } from "../../../types/IProduct";
import { ADD_PRODUCT_VARIATIONS, MutationAddProductVariation } from "../../../graphql/mutations/AddMutations/addProductVariations";
import { GET_ALL_PRODUCTS_ID_NAME, QueryGetAllProductsIdName } from "../../../graphql/queries/getById/getAllProductNameAndId";
import { GET_ALL_PRODUCTS } from "../../../graphql/queries/getAll/getAllProducts";
import { AdminSelectWithLabel } from "../../AdminUI/AdminSelectWithLabel/AdminSelectWithLabel";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { useState } from "react";
import { SuccessMessage } from "../../SuccessPopup/SuccessPopup";

export const AddProductVariationForm = () => {
  const { register, handleSubmit, reset } = useForm<IProd>();
  const [successMessage, setSuccessMessage] = useState(false);
  const [addProductVariation, { error }] = useMutation<MutationAddProductVariation>(ADD_PRODUCT_VARIATIONS);

  const { data } = useQuery<QueryGetAllProductsIdName>(GET_ALL_PRODUCTS_ID_NAME);

  const products = data?.getAllProducts;

  const handleSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addProductVariation({
        variables: {
          productVariation: data,
        },
        refetchQueries: [{ query: GET_ALL_PRODUCTS }],
      })
      console.log('Product variations added',result?.addProductVariation)
      reset();
      handleSuccessMessage();
    } catch (error) {
      console.error(error)
      handleSuccessMessage();
    }
  };

  return (
    <div className="admin">
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        {successMessage && <SuccessMessage message="Product variation added successfully" error={error} />}
        <AdminSelectWithLabel
          label="Product name"
          name='productId'
          register={register}
          renderOptions={() =>
            products?.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))
          }
        />
        <AdminInpuWithLabel label="Image link" name='imageLink' register={register} />
        <AdminInpuWithLabel label="Amount of product" name='variationName' register={register} />
        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}