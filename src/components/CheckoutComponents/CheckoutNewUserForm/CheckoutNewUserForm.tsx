import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from 'classnames';
import { CheckoutTitles } from "../../../utils/checkoutTitles";
import { CheckoutTitlesEnum } from "../../../utils/checkoutTitlesEnums";
import { IUser } from "../../../types/IUser";
import { IOrder } from "../../../types/IOrder";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PAYMENT_METHODS, QueryGetAllPaymentMethods } from "../../../graphql/queries/getAll/getAllPaymentMethods";
import { ADD_ORDER_NEW_USER, MutationAddOrder } from "../../../graphql/mutations/AddMutations/addOrderNewUser";
import { UserInfoTitles } from "../../../utils/inputLabels";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QueryComponent } from "../../QueryComponent/QueryComponent";
import { clearCart } from "../../../app/slices/cartSlice";
import { UserInputWithLabel } from "../../UserComponents/UserInputWithLabel/UserInputWithLabel";
import { UserSelectWithLabel } from "../../UserComponents/UserSelectWithLabel/UserSelectWithLabel";
import { TabWrapper } from "../../TabComponents/TabWrapper/TabWrapper";
import './CheckoutNewUserForm.scss';
import { CheckoutSuccessMessage } from "../CheckoutSuccessMessage/CheckoutSuccessMessage";

export const CheckoutNewUserForm = () => {
  const [activePart, setActivePart] = useState(CheckoutTitlesEnum.SubTitle.PERSONAL_INFO);
  const [successMessage, setSuccessMessage] = useState('');

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<IUser | IOrder>();

  const { cart, counts } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const { data } = useQuery<QueryGetAllPaymentMethods>(GET_ALL_PAYMENT_METHODS);
  const paymentMethods = data?.getAllPaymentMethods;

  const [addOrder, { loading, error }] = useMutation<MutationAddOrder>(ADD_ORDER_NEW_USER);

  const onSubmit: SubmitHandler<IUser | IOrder> = async (formData) => {
    try {
      const orderDetailsInfo = cart.map(cartItem => ({
        variationDetailsId: cartItem.variationDetailsId,
        quantity: counts[`${cartItem.id}_${cartItem.variationName}`],
      }));
      const { data } = await addOrder({
        variables: {
          newShippingInfo: {
            city: (formData as IOrder).city,
            street: (formData as IOrder).street,
            house: (formData as IOrder).house,
            region: (formData as IOrder).region,
            recipientFirstName: (formData as IOrder).recipientFirstName,
            recipientLastName: (formData as IOrder).recipientLastName,
            recipientPhoneNumber: (formData as IOrder).recipientPhoneNumber
          },
          orderInfo: {
            paymentMethod: (formData as IOrder).paymentMethod,
            userComment: (formData as IOrder).userComment
          },
          orderDetailsInfo,
        }
      });

      console.log('Success', data?.addOrder)
      dispatch(clearCart())
      reset();
      setSuccessMessage('Your order successfully added!')
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextTab = () => {
    if (watch('recipientLastName') && watch('recipientLastName') && watch('recipientPhoneNumber')) {
      setActivePart(CheckoutTitlesEnum.SubTitle.DELIVERY_INFO)
    }
  };

  return (
    <QueryComponent isLoading={loading} error={error} errorMessage={error?.message}>
      {!successMessage ? (
        <div className="checkout-user-form">
          <ul className="checkout-user-form__list">
            {CheckoutTitles.SubTitle.map(subtitle => (
              <li
                key={subtitle.id}
                onClick={() => setActivePart(subtitle.title)}
                className={cn("checkout-user-form__item", { 'active': activePart === subtitle.title })}
              >
                <span className="checkout-user-form__number">{subtitle.id}</span>
                {subtitle.title}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabWrapper activeTab={activePart === CheckoutTitlesEnum.SubTitle.PERSONAL_INFO}>
                <div className="checkout-user-form__container">
                  <div className="checkout-user-form__container-children">
                    <UserInputWithLabel label={UserInfoTitles.user?.firstName} name='recipientFirstName' register={register} error={errors} />
                    <UserInputWithLabel label={UserInfoTitles.user?.lastName} name='recipientLastName' register={register} error={errors} />
                  </div>
                  <div className="checkout-user-form__container-children">
                    <UserInputWithLabel label={UserInfoTitles.user?.phoneNumber} name='recipientPhoneNumber' register={register} error={errors} />
                    <button
                      type="button"
                      className="checkout-user-form__button"
                      onClick={handleNextTab}
                    >
                      Further
                    </button>
                  </div>
                </div>
              </TabWrapper>
              <TabWrapper activeTab={activePart === CheckoutTitlesEnum.SubTitle.DELIVERY_INFO}>
                <div className="checkout-user-form__container">
                  <div className="checkout-user-form__container-children">
                    <UserInputWithLabel label={UserInfoTitles.address.city} name='city' register={register} error={errors} />
                    <UserInputWithLabel label={UserInfoTitles.address.region} name='region' register={register} error={errors} />
                    <UserInputWithLabel label={UserInfoTitles.address.street} name='street' register={register} error={errors} />
                  </div>
                  <div className="checkout-user-form__container-children">
                    <UserInputWithLabel label={UserInfoTitles.address.house} name='house' register={register} error={errors} />
                    <UserSelectWithLabel
                      name='paymentMethod'
                      label={UserInfoTitles.address.paymentMethod}
                      register={register}
                      renderOptions={() =>
                        paymentMethods?.map(method => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))
                      }
                    />
                    <button className="checkout-user-form__button-submit">Submit</button>
                  </div>
                </div>
              </TabWrapper>
            </form>
          </div>
        </div>
      ) : (
        <CheckoutSuccessMessage message={successMessage} />
      )}
    </QueryComponent>
  )
}