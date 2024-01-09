import { SubmitHandler, useForm } from "react-hook-form"
import { IProd } from "../../types/IProduct"
import { useMutation, useQuery } from "@apollo/client";
import { ADD_VARIATION_DETAILS, MutationAddVariationDetails } from "../../graphql/mutations/addVariationDetails";
import { GET_ALL_PRODUCTS, QueryGetAllProducts } from "../../graphql/queries/getAllProducts";
import { AdminSelectWithLabel } from "../AdminSelectWithLabel/AdminSelectWithLabel";
import { useState } from "react";
import { AdminInpuWithLabel } from "../AdminInputWithLabel/AdminInputWithLabel";

export const AddVariationsDetailsForm = () => {
  const { register, handleSubmit } = useForm<IProd>();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  const { data } = useQuery<QueryGetAllProducts>(GET_ALL_PRODUCTS);

  const products = data?.getAllProducts;

  const [addVariationDetails] = useMutation<MutationAddVariationDetails>(ADD_VARIATION_DETAILS);

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addVariationDetails({
        variables: {
          variationDetails: data,
        },
        refetchQueries: [{ query: GET_ALL_PRODUCTS }]
      })

      console.log('Variation details added:', result?.addVariationDetails);
      alert('Variation details added')
    } catch (error) {
      console.error(error);
    }
  }

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
  };

  return (
    <div className="admin">
      <div className="admin-input">
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

        {selectedProductId && (
          <AdminSelectWithLabel
            label="Product Variation"
            name='productVariationId'
            register={register}
            renderOptions={() =>
              products
                ?.find((prod) => prod.id === +selectedProductId)
                ?.productVariations.map((variation) => (
                  <option key={variation.id} value={variation.id}>
                    {variation.amount}
                  </option>
                ))
            }
          />
        )}

        <AdminInpuWithLabel label="Price" name='price' register={register} />

        <AdminInpuWithLabel label="Sale price" name='sale' register={register} />

        <AdminInpuWithLabel label="Shipping from" name='shippingFrom' register={register} />

        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}