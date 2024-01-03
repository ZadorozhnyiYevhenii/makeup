import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { inputLabels } from "../../utils/inputLabels";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel";
import { IUser } from "../../types/IUser";
import { FC } from "react";
import { userTabs } from "../../utils/userTabs";

type Props = {
  register: UseFormRegister<IUser>
  onSubmit: () => void,
  handleSubmit: UseFormHandleSubmit<IUser, undefined>,
}

export const UserInformationChangingForm: FC<Props> = ({
  register,
  onSubmit,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user__submit">
      <h1 className="user__submit-title">{userTabs.CONTACT}</h1>
      <InputWithLabel name='firstName' label={inputLabels.firstName} register={register} />
      <InputWithLabel name='lastName' label={inputLabels.lastName} register={register} />
      <InputWithLabel name='email' label={inputLabels.email} register={register} />
      <InputWithLabel name='phoneNumber' label={inputLabels.phoneNumber} register={register} />
      <InputWithLabel name='birthdayDate' label={inputLabels.birthdayDate} register={register} />
      <button
        type="button"
        className="submit__save-button"
      >
        Save
      </button>
    </form>
  );
};