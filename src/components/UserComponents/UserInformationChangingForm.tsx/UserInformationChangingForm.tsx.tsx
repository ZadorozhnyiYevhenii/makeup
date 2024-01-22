import { FC } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { IUser } from "../../../types/IUser";
import { userTabs } from "../../../utils/userTabs";
import { RegisterInputWithLabel } from "../../RegisterInputWIthLabel/RegisterInputWithLabel";
import { UserInfoTitles } from "../../../utils/inputLabels";
import '../../UserComponents/UserInputWithLabel/UserInputWithLabel.scss';

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
    <div style={{ marginTop: '80px' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="user__submit">
        <h1 className="user__submit-title">{userTabs.CONTACT}</h1>
        <RegisterInputWithLabel name='firstName' label={UserInfoTitles.user.firstName} register={register} />
        <RegisterInputWithLabel name='lastName' label={UserInfoTitles.user.lastName} register={register} />
        <RegisterInputWithLabel name='email' label={UserInfoTitles.user.email} register={register} />
        <RegisterInputWithLabel name='phoneNumber' label={UserInfoTitles.user.phoneNumber} register={register} />
        <RegisterInputWithLabel name='birthdayDate' label={UserInfoTitles.user.birthdayDate} register={register} />
        <button
          type="button"
          className="user__save-button"
        >
          Save
        </button>
      </form>
    </div>
  );
};