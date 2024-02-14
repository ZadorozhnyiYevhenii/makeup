import { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks"
import { removeUser } from '../../app/slices/userSlice';
import { IUser } from "../../types/IUser";
import { UserTabTitles, userTabs } from "../../utils/userTabs";
import { UserInformationChangingForm } from "../../components/UserComponents/UserInformationChangingForm.tsx/UserInformationChangingForm.tsx";
import { TabWrapper } from "../../components/TabComponents/TabWrapper/TabWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_JWT_TOKEN, QueryUserByJWT } from "../../graphql/queries/getAuth/getUserByJWTtoken";
import { QueryComponent } from "../../components/QueryComponent/QueryComponent";
import { IOrder } from "../../types/IOrder";
import { UserDeliveryForm } from "../../components/UserComponents/UserDeliveryForm/UserDelliveryForm";
import { ADD_USER_SHIPPING_INFO, MutationAddUserShippingInfo } from "../../graphql/mutations/AddMutations/addUserShippingInfo";
import { MutationEmailVerification, SEND_EMAIL_VERIFICATION } from "../../graphql/mutations/RegisterMutations/sendEmailVerification";
import { VerifyEmail } from "../../components/VerifyEmail/VerifyEmail";
import './UserPage.scss';

export const UserPage = () => {
  const [activeTab, setActiveTab] = useState(UserTabTitles.CONTACTS);
  const userJWT = useAppSelector(state => state.user.userJWT);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [addShippingInfoToUser] = useMutation<MutationAddUserShippingInfo>(ADD_USER_SHIPPING_INFO);

  const { data: dataJWT, loading, error } = useQuery<QueryUserByJWT>(GET_USER_BY_JWT_TOKEN, {
    variables: {
      jwtToken: userJWT
    }
  });

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (error) {
      timerId = setTimeout(() => {
        dispatch(removeUser(userJWT))
        navigate('/makeup', { replace: true })
      }, 2000);
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [error, dispatch, navigate, userJWT])

  const user = dataJWT?.getUserByJwtToken;

  const {
    register,
    handleSubmit,
    setValue
  } = useForm<IUser | IOrder>();

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email);
      setValue('phoneNumber', user.phoneNumber);
      setValue('birthdayDate', user.birthdayDate)
    }
  }, [user, setValue]);

  useEffect(() => {
    if (user?.shippingInfos) {
      setValue('street', user.shippingInfos[0].street);
      setValue('house', user.shippingInfos[0].house);
      setValue('region', user.shippingInfos[0].region);
      setValue('city', user.shippingInfos[0].city);
      setValue('recipientFirstName', user.shippingInfos[0].recipientFirstName);
      setValue('recipientLastName', user.shippingInfos[0].recipientLastName);
      setValue('recipientPhoneNumber', user.shippingInfos[0].recipientPhoneNumber);
    }
  }, [user?.shippingInfos, setValue]);

  const onDeliverySubmit: SubmitHandler<IOrder | IUser> = async (formData) => {
    try {
      const { data } = await addShippingInfoToUser({
        variables: {
          newShippingInfo: {
            region: (formData as IOrder).region,
            street: (formData as IOrder).street,
            house: (formData as IOrder).house,
            recipientFirstName: (formData as IOrder).recipientFirstName,
            recipientLastName: (formData as IOrder).recipientLastName,
            recipientPhoneNumber: (formData as IOrder).recipientPhoneNumber,
            city: (formData as IOrder).city
          },
          userId: user?.id
        }
      })


      console.log('Shipping info added successfully:', data?.addShippingInfoToUser);
    } catch (error) {
      console.error(error, 'Error handling delivery info');
    }
  };

  const logout = () => {
    dispatch(removeUser(user));
    navigate('/makeup', { replace: true });
    window.scrollTo(0, 0);
  };

  const onSubmit = () => {
    alert('changes are submited')
  };

  const [sendEmailVerification] = useMutation<MutationEmailVerification>(SEND_EMAIL_VERIFICATION);

  const handleVerifyEmail = async () => {
    try {
      const { data } = await sendEmailVerification({
        variables: {
          verificationMail: {
            emailTo: user?.email,
            userId: user?.id
          }
        },
        update: (cache, { data }) => {
          const existingData = cache.readQuery<QueryUserByJWT>({
            query: GET_USER_BY_JWT_TOKEN,
            variables: { jwtToken: userJWT }
          });

          if (existingData && data) {
            const updatedUser = {
              ...existingData.getUserByJwtToken,
              isEmailVerified: true,
              id: existingData.getUserByJwtToken.id || 0,
              ...data
            };

            cache.writeQuery<QueryUserByJWT>({
              query: GET_USER_BY_JWT_TOKEN,
              variables: { jwtToken: userJWT },
              data: {
                getUserByJwtToken: updatedUser
              }
            });
          }
        }
      });

      console.log("Email verification sent:", data?.sendEmailVerificationMail);
    } catch (error) {
      console.error("Error sending email verification:", error);
    }
  };

  return (
        <div className="user">
          <QueryComponent
            isLoading={loading}
            error={error}
            errorMessage={error?.message}
          >
            <ul className="user__nav">
              {userTabs.map(tab => (
                <li
                  className={cn("user__tab", { 'active': activeTab === tab.value })}
                  onClick={() => setActiveTab(tab.value)}
                  key={tab.name}
                >
                  {tab.name}
                </li>
              ))}
              <button onClick={logout} className="user__logout">
                Log out
              </button>
            </ul>
            <div className="user__content">
              <VerifyEmail
                onVerify={handleVerifyEmail}
                user={user}
              />
              <TabWrapper activeTab={activeTab === UserTabTitles.CONTACTS}>
                <UserInformationChangingForm
                  register={register}
                  onSubmit={onSubmit}
                  handleSubmit={handleSubmit}
                />
              </TabWrapper>
              <TabWrapper activeTab={activeTab === UserTabTitles.ADDRESS}>
                <UserDeliveryForm
                  register={register}
                  onSubmit={onDeliverySubmit}
                  handleSubmit={handleSubmit}
                  shippingInfo={user?.shippingInfos}
                />
              </TabWrapper>
              <TabWrapper activeTab={activeTab === UserTabTitles.ORDERS}>
                <div>Feature not implemented yet</div>
              </TabWrapper>
            </div>
          </QueryComponent>
        </div>
  );
};