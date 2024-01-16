import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from 'classnames';
import { CheckoutTitles } from "../../utils/checkoutTitles";
import { TabWrapper } from "../TabWrapper/TabWrapper";
import { CheckoutTitlesEnum } from "../../utils/checkoutTitlesEnums";
import { UserInputWithLabel } from "../UserInputWithLabel/UserInputWithLabel";
import { IUser } from "../../types/IUser";
import { IOrder } from "../../types/IOrder";
import { UserSelectWithLabel } from "../UserSelectWithLabel/UserSelectWithLabel";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PAYMENT_METHODS, QueryGetAllPaymentMethods } from "../../graphql/queries/getAll/getAllPaymentMethods";
import { ADD_ORDER, MutationAddOrder } from "../../graphql/mutations/AddMutations/addOrder";
import { UserInfoTitles } from "../../utils/inputLabels";
import { useAppSelector } from "../../app/hooks";
import { ADD_ORDER_DETAILS, MutationAddOrderDetails } from "../../graphql/mutations/AddMutations/addOrderDetails";
import { QueryComponent } from "../QueryComponent/QueryComponent";
import './CheckoutNewUserForm.scss';

export const CheckoutNewUserForm = () => {
  const [activePart, setActivePart] = useState(CheckoutTitlesEnum.SubTitle.PERSONAL_INFO);
  const { register, handleSubmit, reset } = useForm<IUser | IOrder>();
  const { cart, counts } = useAppSelector(state => state.cart);

  const { data } = useQuery<QueryGetAllPaymentMethods>(GET_ALL_PAYMENT_METHODS);
  const paymentMethods = data?.getAllPaymentMethods;

  const [addOrderDetails] = useMutation<MutationAddOrderDetails>(ADD_ORDER_DETAILS)

  const [addOrder, { loading, error }] = useMutation<MutationAddOrder>(ADD_ORDER);

  const onSubmit: SubmitHandler<IUser | IOrder> = async (data) => {
    try {
      const { data: result } = await addOrder({
        variables: {
          address: {
            city: (data as IOrder).city,
            street: (data as IOrder).street,
            house: (data as IOrder).house,
            region: (data as IOrder).region,
          },
          orderInfo: {
            firstName: (data as IUser).firstName,
            lastName: (data as IUser).lastName,
            phoneNumber: (data as IUser).phoneNumber,
            paymentMethod: (data as IOrder).paymentMethod
          },
        }
      });

      for (const cartItem of cart) {
        const orderDetails = {
          quantity: counts[`${cartItem.id}_${cartItem.variationName}`],
          orderId: (result?.addOrder as IOrder).id,
          variationDetailsId: cartItem.variationDetailsId
        };

        const { data: orderDetailsResult } = await addOrderDetails({
          variables: {
            orderDetails: orderDetails,
          }
        });

        console.log('Order details success', orderDetailsResult?.addOrderDetails);
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <QueryComponent isLoading={loading} error={error} errorMessage={error?.message}>
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
                  <UserInputWithLabel label={UserInfoTitles.user.firstName} name='firstName' register={register} errorMessage={error?.message} />
                  <UserInputWithLabel label={UserInfoTitles.user.lastName} name='lastName' register={register} errorMessage={error?.message} />
                </div>
                <div className="checkout-user-form__container-children">
                  <UserInputWithLabel label={UserInfoTitles.user.phoneNumber} name='phoneNumber' register={register} errorMessage={error?.message} />
                  <button
                    type="button"
                    className="checkout-user-form__button"
                  >
                    Further
                  </button>
                </div>
              </div>
            </TabWrapper>
            <TabWrapper activeTab={activePart === CheckoutTitlesEnum.SubTitle.DELIVERY_INFO}>
              <div className="checkout-user-form__container">
                <div className="checkout-user-form__container-children">
                  <UserInputWithLabel label={UserInfoTitles.address.city} name='city' register={register} errorMessage={error?.message} />
                  <UserInputWithLabel label={UserInfoTitles.address.region} name='region' register={register} errorMessage={error?.message} />
                  <UserInputWithLabel label={UserInfoTitles.address.street} name='street' register={register} errorMessage={error?.message} />
                </div>
                <div className="checkout-user-form__container-children">
                  <UserInputWithLabel label={UserInfoTitles.address.house} name='house' register={register} />
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
                </div>
              </div>
              <button className="checkout-user-form__button">Submit</button>
            </TabWrapper>
          </form>
        </div>
      </div>
    </QueryComponent>
  )
}