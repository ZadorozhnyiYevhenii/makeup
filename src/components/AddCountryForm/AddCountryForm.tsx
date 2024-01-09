import { SubmitHandler, useForm } from "react-hook-form"
import { IProd } from "../../types/IProduct"
import { useMutation } from "@apollo/client"
import { ADD_COUNTRY, MutationAddCountry } from "../../graphql/mutations/addCountry"
import { GET_ALL_COUNTRIES } from "../../graphql/queries/getAllCountries"
import { AdminInpuWithLabel } from "../AdminInputWithLabel/AdminInputWithLabel"

export const AddCountryForm = () => {
  const { register, handleSubmit } = useForm<IProd>()
  const [addCountry] = useMutation<MutationAddCountry>(ADD_COUNTRY);

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addCountry({
        variables: {
          countryName: data.countryName
        },
        refetchQueries: [{ query: GET_ALL_COUNTRIES }]
      });

      console.log('added new country', result?.addCountry)
      alert('added country')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="admin">
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        <AdminInpuWithLabel label="Country name" name='countryName' register={register} />
        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}