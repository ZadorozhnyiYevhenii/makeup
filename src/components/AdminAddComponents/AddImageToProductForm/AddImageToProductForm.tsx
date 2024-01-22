import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client";
import { IProd } from "../../../types/IProduct";
import { GET_ALL_PRODUCTS_ID_NAME, QueryGetAllProductsIdName } from "../../../graphql/queries/getById/getAllProductNameAndId";
import { ADD_IMAGE_TO_PRODUCT, MutationAddImage } from "../../../graphql/mutations/AddMutations/addImageToProduct";
import { AdminSelectWithLabel } from "../../AdminUI/AdminSelectWithLabel/AdminSelectWithLabel";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { useState } from "react";
import { SuccessMessage } from "../../SuccessPopup/SuccessPopup";

export const AddImageToProductForm = () => {
  const { handleSubmit, register } = useForm<IProd>();
  const [successMessage, setSuccessMessage] = useState(false);

  const { data } = useQuery<QueryGetAllProductsIdName>(GET_ALL_PRODUCTS_ID_NAME);
  const products = data?.getAllProducts;

  const [addImageToProduct, { error }] = useMutation<MutationAddImage>(ADD_IMAGE_TO_PRODUCT);

  const handleSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addImageToProduct({
        variables: {
          imageLink: data.imageLink,
          productId: data.id,
        }
      });

      console.log('Photo added:', result?.addImageToProduct);
      handleSuccessMessage();
    } catch (error) {
      console.error(error);
      handleSuccessMessage();
    }
  };

  return (
    <div className="admin">
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        {successMessage && <SuccessMessage message="Image added successfully" error={error} />}
        <AdminSelectWithLabel
          label="Product name"
          name='id'
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
        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}