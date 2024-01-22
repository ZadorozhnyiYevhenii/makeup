import { useMutation } from "@apollo/client"
import { ADD_BRAND, MutationAddBrand } from "../../../graphql/mutations/AddMutations/addBrand"
import { SubmitHandler, useForm } from "react-hook-form";
import { IProd } from "../../../types/IProduct";
import { GET_ALL_BRANDS } from "../../../graphql/queries/getAll/getAllBrand";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";

export const AddBrandForm = () => {
  const { register, handleSubmit, reset } = useForm<IProd>()
  const [addBrand] = useMutation<MutationAddBrand>(ADD_BRAND);

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addBrand({
        variables: {
          brandName: data.brandName,
        },
        refetchQueries: [{ query: GET_ALL_BRANDS }]
      });

      console.log('Brand addded:', result?.addBrand);
      reset();
      alert('Brand added successfully')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="admin">
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        <AdminInpuWithLabel label="Brand name" name='brandName' register={register} />
        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}