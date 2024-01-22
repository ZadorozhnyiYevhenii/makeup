import { useMutation } from "@apollo/client"
import { ADD_BRAND, MutationAddBrand } from "../../../graphql/mutations/AddMutations/addBrand"
import { SubmitHandler, useForm } from "react-hook-form";
import { IProd } from "../../../types/IProduct";
import { GET_ALL_BRANDS } from "../../../graphql/queries/getAll/getAllBrand";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { SuccessMessage } from "../../SuccessPopup/SuccessPopup";
import { useState } from "react";

export const AddBrandForm = () => {
  const { register, handleSubmit, reset } = useForm<IProd>()
  const [addBrand, { error }] = useMutation<MutationAddBrand>(ADD_BRAND);
  const [successMessage, setSuccessMessage] = useState(false);

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addBrand({
        variables: {
          brandName: data.brandName,
        },
        refetchQueries: [{ query: GET_ALL_BRANDS }]
      });
  
      if (result) {
        reset();
        setSuccessMessage(true);
  
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      } else {
        console.error("Error adding brand");
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="admin">
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        {successMessage && <SuccessMessage message="Brand added successfully" error={error} />}
        <AdminInpuWithLabel label="Brand name" name='brandName' register={register} />
        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}