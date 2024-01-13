import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form"
import { DELETE_CATEGORY, MutationDeleteCategory } from "../../../graphql/mutations/DeleteMutation/deleteCategory";
import { useState } from "react";
import { GET_ALL_CATEGORIES, QueryGetAllCategories } from "../../../graphql/queries/getAll/getAllCategories";
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel";
import { IProd } from "../../../types/IProduct";

export const DeleteCategoryComponent = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data } = useQuery<QueryGetAllCategories>(GET_ALL_CATEGORIES);
  const categories = data?.getAllCategories;

  const [deleteCategory] = useMutation<MutationDeleteCategory>(DELETE_CATEGORY);

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
        const { data: result } = await deleteCategory({
          variables: {
            categoryId: +selectedCategory
          }
        });

        console.log('Succesfully deleted category', result)
        alert('Succesfully deleted category')
    } catch (error) {
      console.error(error);
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    const chosenCategory = categories?.find(category => category.id === +categoryId);

    if (chosenCategory) {
      setValue('categoryId', chosenCategory.id)
    }
  }

  return (
    <div>
       <div className="admin">
      <div className="admin-input">
        <label className="admin-input__label">Category name</label>
        <select onChange={(e) => handleCategoryChange(e.target.value)} className="admin-input__input">
          {categories?.map(prod => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>

      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'none' }}>
          <AdminInpuWithLabel label="Brand id" name='categoryIds' register={register} />
        </div>
        <button className="admin__button">Delete</button>
      </form>
    </div>
    </div>
  )
}