import { FC } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { IUser } from "../../../types/IUser";
import { UserTabTitles } from "../../../utils/userTabs";
import { RegisterInputWithLabel } from "../../RegisterInputWIthLabel/RegisterInputWithLabel";
import { UserInfoTitles } from "../../../utils/inputLabels";
import '../../UserComponents/UserInputWithLabel/UserInputWithLabel.scss';
import { IOrder } from "../../../types/IOrder";

type Props = {
  register: UseFormRegister<IUser | IOrder>
  onSubmit: () => void,
  handleSubmit: UseFormHandleSubmit<IUser | IOrder, undefined>,
}

export const UserInformationChangingForm: FC<Props> = ({
  register,
  onSubmit,
  handleSubmit,
}) => {
  return (
    <>
      <h1 className="user__submit-title">{UserTabTitles.CONTACTS}</h1>
      <div style={{ marginTop: '80px' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="user__submit">
          <RegisterInputWithLabel name='firstName' label={UserInfoTitles.user?.firstName} register={register} />
          <RegisterInputWithLabel name='lastName' label={UserInfoTitles.user?.lastName} register={register} />
          <RegisterInputWithLabel name='email' label={UserInfoTitles.user?.email} register={register} />
          <RegisterInputWithLabel name='phoneNumber' label={UserInfoTitles.user?.phoneNumber} register={register} />
          <RegisterInputWithLabel name='birthdayDate' label={UserInfoTitles.user?.birthdayDate} register={register} />
        </form>
      </div>
    </>
  );
};