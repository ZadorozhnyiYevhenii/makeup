import { useAppDispatch } from "../../../app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../../types/IUser";
import { AUTH_USER, QueryAuth } from "../../../graphql/queries/getAuth/authenticateUser";
import { client } from "../../../graphql/client";
import { addUserJWT } from "../../../app/slices/userSlice";
import { IOrder } from "../../../types/IOrder";
import { UserInputWithLabel } from "../../UserComponents/UserInputWithLabel/UserInputWithLabel";

export const CheckoutRegisteredUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser | IOrder>();

  const dispatch = useAppDispatch();

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

      console.log(authResult.data.authenticateUser.jwtToken)

      if (authResult.data && authResult.data.authenticateUser && authResult.data.authenticateUser.jwtToken) {
        dispatch(addUserJWT(authResult.data.authenticateUser.jwtToken));
      } else {
        console.error("Authentication failed");
      }
      reset();
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="checkout-user-form">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-user-form__container">
            <div className="checkout-user-form__container-children">
              <UserInputWithLabel
                label="Your email"
                name='email'
                register={register}
                isEmail
                error={errors}
              />
            </div>
            <div className="checkout-user-form__container-children">
              <UserInputWithLabel
                label="Your password"
                name='password'
                register={register}
                isPassword
                error={errors}
              />
            </div>
          </div>
          <button className="checkout-user-form__button-submit">Log in</button>
      </form>
    </div>
  )
}