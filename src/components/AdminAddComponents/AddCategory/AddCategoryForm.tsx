import { SubmitHandler, useForm } from "react-hook-form"
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel"
import { IProd } from "../../../types/IProduct"
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY, MutationAddCategory } from "../../../graphql/mutations/AddMutations/AddCategory";
import { GET_ALL_CATEGORIES, QueryGetAllCategories } from "../../../graphql/queries/getAll/getAllCategories";
import { useState } from "react";

export const AddCategoryComponent = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();
  const [addCategory] = useMutation<MutationAddCategory>(ADD_CATEGORY);
  const [selectedParentCategory, setSelectedParentCategory] = useState('');

  const { data } = useQuery<QueryGetAllCategories>(GET_ALL_CATEGORIES);

  const categories = data?.getAllCategories;

  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      const { data: result } = await addCategory({
        variables: {
          categoryName: data.categoryName,
          parentCategoryId: +selectedParentCategory,
        },
        refetchQueries: [{ query: GET_ALL_CATEGORIES }]
      });

      console.log('Succesfully added category', result?.categoryName);
      alert('Succesfully added category');
    } catch (error) {
      console.error(error);
    }
  };

  const handleParentCategory = (parentCategoryId: string) => {
    setSelectedParentCategory(parentCategoryId);

    const chosenCategory = categories?.find(category => category.id === +parentCategoryId);

    if (chosenCategory) {
      setValue('parentCategoryId', chosenCategory.id)
    }
  }

  return (
    <div className="admin">
      <div className="admin-input">
        <label className="admin-input__label">Category name</label>
        <select onChange={(e) => handleParentCategory(e.target.value)} className="admin-input__input">
          {categories?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        <AdminInpuWithLabel label="Category name" name='categoryName' register={register} />
        <div style={{ display: 'none' }}>
          <AdminInpuWithLabel label="Parent category id" name='parentCategoryId' register={register} />
        </div>
        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}