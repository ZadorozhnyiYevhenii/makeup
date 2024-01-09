import { SubmitHandler, useForm } from "react-hook-form"
import { IProd } from "../../types/IProduct"
import { useMutation, useQuery } from "@apollo/client";
import { ADD_IMAGE_TO_PRODUCT, MutationAddImage } from "../../graphql/mutations/addImageToProduct";
import { AdminInpuWithLabel } from "../AdminInputWithLabel/AdminInputWithLabel";
import { GET_ALL_PRODUCTS_ID_NAME, QueryGetAllProductsIdName } from "../../graphql/queries/getAllProductNameAndId";
import { AdminSelectWithLabel } from "../AdminSelectWithLabel/AdminSelectWithLabel";

export const AddImageToProductForm = () => {
  const { handleSubmit, register } = useForm<IProd>();

  const { data } = useQuery<QueryGetAllProductsIdName>(GET_ALL_PRODUCTS_ID_NAME);

  const products = data?.getAllProducts;

  const [addImageToProduct] = useMutation<MutationAddImage>(ADD_IMAGE_TO_PRODUCT);

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addImageToProduct({
        variables: {
          imageLink: data.imageLink,
          productId: data.id,
        }
      });

      console.log('Photo added:', result?.addImageToProduct);
      alert('Photo added')
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="admin">
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
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