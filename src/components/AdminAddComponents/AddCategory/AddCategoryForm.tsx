import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { AdminInpuWithLabel } from "../../AdminUI/AdminInputWithLabel/AdminInputWithLabel"
import { IProd } from "../../../types/IProduct"
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY, ADD_CATEGORY_WITH_PARENT_CATEGORY_ID, MutationAddCategory, MutationAddCategoryWithParentcategory } from "../../../graphql/mutations/AddMutations/AddCategory";
import { GET_ALL_CATEGORIES, QueryGetAllCategories } from "../../../graphql/queries/getAll/getAllCategories";

export const AddCategoryComponent = () => {
  const { register, handleSubmit, setValue } = useForm<IProd>();
  const [addCategoryWithParentCategory] = useMutation<MutationAddCategoryWithParentcategory>(ADD_CATEGORY_WITH_PARENT_CATEGORY_ID);
  const [addCategory] = useMutation<MutationAddCategory>(ADD_CATEGORY);
  const [selectedParentCategory, setSelectedParentCategory] = useState('');

  const { data } = useQuery<QueryGetAllCategories>(GET_ALL_CATEGORIES);

  const categories = data?.getAllCategories;


  const onSubmit: SubmitHandler<IProd> = async (data) => {
    try {
      if (selectedParentCategory) {
        const { data: result } = await addCategoryWithParentCategory({
          variables: {
            categoryName: data.categoryName,
            parentCategoryId: +selectedParentCategory
          },
          refetchQueries: [{ query: GET_ALL_CATEGORIES }],
        });

        console.log('Successfully added category with parent', result?.categoryName);
        alert('Successfully added category with parent');
      } else {
        const { data: result } = await addCategory({
          variables: {
            categoryName: data.categoryName,
          },
          refetchQueries: [{ query: GET_ALL_CATEGORIES }],
        });

        console.log('Successfully added category', result?.categoryName);
        alert('Successfully added category');
      }
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
        <label className="admin-input__label">Parent category name</label>
        <select onChange={(e) => handleParentCategory(e.target.value)} className="admin-input__input">
          <option value={''}></option>
          {categories?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <form className="admin__form-addBrand" onSubmit={handleSubmit(onSubmit)}>
        <AdminInpuWithLabel label="Category name*" name='categoryName' register={register} />
        {selectedParentCategory && (
          <div style={{ display: 'none' }}>
            <AdminInpuWithLabel label="Parent category id" name='parentCategoryId' register={register} required={false} />
          </div>
        )}
        <button className="admin__button">Submit</button>
      </form>
    </div>
  )
}