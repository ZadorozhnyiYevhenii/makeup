import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { IProd } from "../../../types/IProduct";
import { GET_ALL_PRODUCTS_ID_NAME } from "../../../graphql/queries/getById/getAllProductNameAndId";
import { QueryGetAllProductsIdName } from "../../../graphql/queries/getById/getAllProductNameAndId";
import { DELETE_PRODUCT, MutationDeleteProduct } from "../../../graphql/mutations/DeleteMutation/deleteProduct";
import { SuccessMessage } from "../../SuccessPopup/SuccessPopup";

export const DeleteProductComponent = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();
  const [successMessage, setSuccessMessage] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const { data } = useQuery<QueryGetAllProductsIdName>(GET_ALL_PRODUCTS_ID_NAME);
  const products = data?.getAllProducts;

  const [deleteProduct, { error }] = useMutation<MutationDeleteProduct>(DELETE_PRODUCT);

  const handleSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await deleteProduct({
        variables: {
          productId: +selectedProduct,
        }
      });

      console.log('Succesfully deleted product', result)
      handleSuccessMessage();
    } catch (error) {
      console.error(error);
      handleSuccessMessage();
    }
  }

  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);

    const chosenProduct = products?.find(product => product.id === +productId);

    if (chosenProduct) {
      setValue('productId', chosenProduct.id)
    }
  }

  return (
    <div className="admin">
      <div className="admin-input">
        {successMessage && <SuccessMessage message="Product deleted successfully" error={error} />}
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
        <div style={{ display: 'none' }}>
          <AdminInpuWithLabel label="Product Id" name='productId' register={register} />
        </div>
        <button className="admin__button">Delete</button>
      </form>
    </div>
  )
}