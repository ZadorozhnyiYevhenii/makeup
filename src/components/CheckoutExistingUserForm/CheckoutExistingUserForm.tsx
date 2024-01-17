import { useState } from "react";
import cn from 'classnames';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { CheckoutTitles } from "../../utils/checkoutTitles";
import { TabWrapper } from "../TabWrapper/TabWrapper";
import { CheckoutTitlesEnum } from "../../utils/checkoutTitlesEnums";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../types/IUser";
import { IOrder } from "../../types/IOrder";
import { ADD_ORDER, MutationAddOrder } from "../../graphql/mutations/AddMutations/addOrder";
import { GET_ALL_PAYMENT_METHODS, QueryGetAllPaymentMethods } from "../../graphql/queries/getAll/getAllPaymentMethods";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ORDER_DETAILS, MutationAddOrderDetails } from "../../graphql/mutations/AddMutations/addOrderDetails";
import { UserInputWithLabel } from "../UserInputWithLabel/UserInputWithLabel";
import { UserSelectWithLabel } from "../UserSelectWithLabel/UserSelectWithLabel";
import { UserInfoTitles } from "../../utils/inputLabels";
import { clearCart } from "../../app/slices/cartSlice";

export const CheckoutExistingUserForm = () => {
  const user = useAppSelector(state => state.user.user);
  const [activePart, setActivePart] = useState(CheckoutTitlesEnum.SubTitle.PERSONAL_INFO);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser | IOrder>();
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useAppDispatch();

  const { cart, counts } = useAppSelector(state => state.cart);

  const { data } = useQuery<QueryGetAllPaymentMethods>(GET_ALL_PAYMENT_METHODS);
  const paymentMethods = data?.getAllPaymentMethods;

  const [addOrderDetails] = useMutation<MutationAddOrderDetails>(ADD_ORDER_DETAILS)

  const [addOrder] = useMutation<MutationAddOrder>(ADD_ORDER);

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
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumber,
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
        setSuccessMessage('Your order is successfully submited!')
        console.log('Order details success', orderDetailsResult?.addOrderDetails);
      }
      dispatch(clearCart())
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeliveryTab = () => {
    setActivePart(CheckoutTitlesEnum.SubTitle.DELIVERY_INFO)
  };

  return (
    <div className="checkout-user-form">
      {!successMessage ? (
        <>
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
                    <label className="checkout-user-form__label">Your full name</label>
                    <div className="checkout-user-form__wrapper">
                      <div {...register('firstName')}>{user?.firstName}</div>
                      <div {...register('lastName')}>{user?.lastName}</div>
                    </div>
                  </div>
                  <div className="checkout-user-form__container-children">
                    <label className="checkout-user-form__label">Your email</label>
                    <div {...register('email')} className="checkout-user-form__existing">{user?.email}</div>
                    <label className="checkout-user-form__label">Your phone number</label>
                    <div {...register('phoneNumber')}>{user?.phoneNumber}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="checkout-user-form__button"
                  onClick={handleDeliveryTab}
                >
                  Further
                </button>
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
        </>
      ) : (
        <div className="checkout-user-form__modal">
          <p className="checkout-user-form__modal-message">{successMessage}</p>
          <Link to={'/makeup'} className="checkout-user-form__modal-link">Shopping more</Link>
        </div>
      )}
    </div>
  )
}