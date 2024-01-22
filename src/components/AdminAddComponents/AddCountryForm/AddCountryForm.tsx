import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { IProd } from "../../../types/IProduct";
import { ADD_COUNTRY, MutationAddCountry } from "../../../graphql/mutations/AddMutations/addCountry";
import { GET_ALL_COUNTRIES } from "../../../graphql/queries/getAll/getAllCountries";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { useState } from "react";
import { SuccessMessage } from "../../SuccessPopup/SuccessPopup";

export const AddCountryForm = () => {
  const { register, handleSubmit } = useForm<IProd>()
  const [addCountry, { error }] = useMutation<MutationAddCountry>(ADD_COUNTRY);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addCountry({
        variables: {
          countryName: data.countryName
        },
        refetchQueries: [{ query: GET_ALL_COUNTRIES }]
      });

      console.log('added new country', result?.addCountry)
      handleSuccessMessage();
    } catch (error) {
      console.error(error);
      handleSuccessMessage();
    }
  }

  return (
    <div className="admin">
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        {successMessage && <SuccessMessage message="Country added successfully" error={error} />}
        <AdminInpuWithLabel label="Country name" name='countryName' register={register} />
        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}