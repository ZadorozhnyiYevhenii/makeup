import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { IProd } from "../../../types/IProduct";
import { DELETE_COUNTRY, MutationDeleteCountry } from "../../../graphql/mutations/DeleteMutation/deleteCountry";
import { GET_ALL_COUNTRIES } from "../../../graphql/queries/getAll/getAllCountries";
import { getAllCountries } from "../../../graphql/queries/getAll/getAllCountries";

export const DeleteCountryComponent = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();

  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const { data } = useQuery<getAllCountries>(GET_ALL_COUNTRIES);
  const countries = data?.getAllCountries;

  const [deleteCountry] = useMutation<MutationDeleteCountry>(DELETE_COUNTRY);

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
        const { data: result } = await deleteCountry({
          variables: {
            countryId: +selectedCountry
          }
        });

        console.log('Succesfully deleted country', result)
        alert('Succesfully deleted country')
    } catch (error) {
      console.error(error);
    }
  }

  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId);

    const chosenCountry = countries?.find(country => country.id === +countryId);

    console.log(chosenCountry)

    if (chosenCountry) {
      setValue('countryId', chosenCountry.id)
    }
  }

  return (
    <div>
       <div className="admin">
      <div className="admin-input">
        <label className="admin-input__label">Country name</label>
        <select onChange={(e) => handleCountryChange(e.target.value)} className="admin-input__input">
          {countries?.map(prod => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>

      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'none' }}>
          <AdminInpuWithLabel label="Country Id" name='countryId' register={register} />
        </div>
        <button className="admin__button">Delete</button>
      </form>
    </div>
    </div>
  )
}