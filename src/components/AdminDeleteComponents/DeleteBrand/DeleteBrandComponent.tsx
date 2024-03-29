import { SubmitHandler, useForm } from "react-hook-form"
import { IProd } from "../../../types/IProduct"
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_BRANDS } from "../../../graphql/queries/getAll/getAllBrand";
import { QueryAllBrands } from "../../../graphql/queries/getAll/getAllBrand";
import { useState } from "react";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { DELETE_BRAND } from "../../../graphql/mutations/DeleteMutation/deleteBrand";
import { MutationDeleteBrand } from "../../../graphql/mutations/DeleteMutation/deleteBrand";
import { SuccessMessage } from "../../SuccessPopup/SuccessPopup";

export const DeleteBrandComponent = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IProd>();

  const [deleteBrand, { error }] = useMutation<MutationDeleteBrand>(DELETE_BRAND)

  const { data } = useQuery<QueryAllBrands>(GET_ALL_BRANDS);

  const brands = data?.getAllBrands;

  const handleSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await deleteBrand({
        variables: {
          brandId: +selectedBrand,
        }
      });

      console.log('Deleted brand:', result?.brandId);
      handleSuccessMessage();
    } catch (error) {
      console.error(error);
      handleSuccessMessage();
    }
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);

    const chosenBrand = brands?.find(brand => brand.id === +brandId);

    if (chosenBrand) {
      setValue('brandId', chosenBrand.id);
    }
  };

  return (
    <div className="admin">
      <div className="admin-input">
        {successMessage && <SuccessMessage message="Brand deleted successfully" error={error} />}
        <label className="admin-input__label">Brand name</label>
        <select onChange={(e) => handleBrandChange(e.target.value)} className="admin-input__input">
          {brands?.map(prod => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>

      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'none' }}>
          <AdminInpuWithLabel label="Brand id" name='brandId' register={register} />
        </div>
        <button className="admin__button">Delete</button>
      </form>
    </div>
  )
}