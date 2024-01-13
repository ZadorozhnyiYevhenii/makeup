import { SubmitHandler, useForm } from "react-hook-form";
import { IProd } from "../../types/IProduct";
import { useMutation, useQuery } from "@apollo/client";
import { AdminSelectWithLabel } from "../AdminSelectWithLabel/AdminSelectWithLabel";
import { GET_ALL_PRODUCTS } from "../../graphql/queries/getById/getAllProducts";
import { AdminInpuWithLabel } from "../AdminInputWithLabel/AdminInputWithLabel";
import { ADD_PRODUCT_VARIATIONS, MutationAddProductVariation } from "../../graphql/mutations/AddMutations/addProductVariations";
import { GET_ALL_PRODUCTS_ID_NAME, QueryGetAllProductsIdName } from "../../graphql/queries/getById/getAllProductNameAndId";

export const AddProductVariationForm = () => {
  const { register, handleSubmit } = useForm<IProd>()
  const [addProductVariation] = useMutation<MutationAddProductVariation>(ADD_PRODUCT_VARIATIONS);

  const { data } = useQuery<QueryGetAllProductsIdName>(GET_ALL_PRODUCTS_ID_NAME);

  const products = data?.getAllProducts;

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addProductVariation({
        variables: {
          productVariation: data,
        },
        refetchQueries: [{ query: GET_ALL_PRODUCTS }],
      })
      console.log('Product variations added',result?.addProductVariation)
      alert('Product variations added')
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="admin">
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
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