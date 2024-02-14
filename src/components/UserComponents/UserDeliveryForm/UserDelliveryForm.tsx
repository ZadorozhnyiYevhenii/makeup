import { FC } from "react"
import cn from 'classnames';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { IOrder } from "../../../types/IOrder"
import { IUser } from "../../../types/IUser"
import { RegisterInputWithLabel } from "../../RegisterInputWIthLabel/RegisterInputWithLabel"
import { UserTabTitles } from "../../../utils/userTabs"
import { UserInfoTitles } from "../../../utils/inputLabels"

type Props = {
  register: UseFormRegister<IOrder | IUser>
  onSubmit: SubmitHandler<IUser | IOrder>,
  handleSubmit: UseFormHandleSubmit<IUser | IOrder>,
  shippingInfo: IOrder[] | undefined
}

export const UserDeliveryForm: FC<Props> = ({
  register,
  onSubmit,
  handleSubmit,
  shippingInfo
}) => {
  return (
    <div style={{ marginTop: '80px' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="user__submit">
        <h1 className="user__submit-title">{UserTabTitles.ADDRESS}</h1>
        <RegisterInputWithLabel name='street' label={UserInfoTitles.address.street} register={register} />
        <RegisterInputWithLabel name='city' label={UserInfoTitles.address.city} register={register} />
        <RegisterInputWithLabel name='house' label={UserInfoTitles.address.house} register={register} />
        <RegisterInputWithLabel name='region' label={UserInfoTitles.address.region} register={register} />
        <RegisterInputWithLabel name='recipientFirstName' label={UserInfoTitles.address.recipientFirstName} register={register} />
        <RegisterInputWithLabel name='recipientLastName' label={UserInfoTitles.address.recipientLastName} register={register} />
        <RegisterInputWithLabel name='recipientPhoneNumber' label={UserInfoTitles.address.recipientPhoneNumber} register={register} />
        <button
          type="submit"
          className={cn("user__save-button", {"disable": !!shippingInfo})}
          disabled={!!shippingInfo}
        >
          Save
        </button>
      </form>
    </div>
  )
}