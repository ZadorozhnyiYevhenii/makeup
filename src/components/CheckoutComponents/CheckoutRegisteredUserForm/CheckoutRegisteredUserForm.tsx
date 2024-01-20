import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../../types/IUser";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS, QueryUsers } from "../../../graphql/queries/getAll/getAllUsers";
import { AUTH_USER, QueryAuth } from "../../../graphql/queries/getAuth/authenticateUser";
import { client } from "../../../graphql/client";
import { addUser } from "../../../app/slices/userSlice";
import { IOrder } from "../../../types/IOrder";
import { UserInputWithLabel } from "../../UserComponents/UserInputWithLabel/UserInputWithLabel";

export const CheckoutRegisteredUserForm = () => {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser | IOrder>();
  const dispatch = useAppDispatch();
  const { data, error } = useQuery<QueryUsers>(GET_ALL_USERS);

  const users = data?.getAllUsers;

  const onSubmit: SubmitHandler<IUser | IOrder> = async (data) => {
    try {
      const authenticationData = {
        request: {
          email: (data as IUser).email,
          password: (data as IUser).password,
        },
      };

      const authResult = await client.query<QueryAuth>({
        query: AUTH_USER,
        variables: authenticationData,
      });

      const user = users?.find(user => user.email === authenticationData.request.email);

      if (authResult.data && authResult.data.authenticateUser && authResult.data.authenticateUser.jwtToken) {
        console.log("Authentication successful!");
        dispatch(addUser(user))
        setTimeout(() => {
          setMessage('Authentication successful!')
        }, 3000);
      } else {
        console.error("Authentication failed");
        setMessage('Authentication failed. Please check your credentials!')
      }
      reset()
    } catch (error) {
      console.error("Error during authentication:", error);
      setMessage('An unexpected error occurred. Please try again later.')
    }
  };
  return (
    <div className="checkout-user-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        {!message ? (
          <div className="checkout-user-form__container">
            <div className="checkout-user-form__container-children">
              <UserInputWithLabel
                label="Your email"
                name='email'
                register={register}
                isEmail
                error={errors}
                errorMessage={error?.message}
              />
            </div>
            <div className="checkout-user-form__container-children">
              <UserInputWithLabel
                label="Your password"
                name='password'
                register={register}
                isPassword
                error={errors}
                errorMessage={error?.message}
              />
            </div>
          </div>
        ) : (
          <div>Successfull authorithation</div>
          )}
          <button className="checkout-user-form__button-submit">Log in</button>
      </form>
    </div>
  )
}