import React, { memo, useState } from "react";
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../types/IUser";
import { Loader } from "../Loader/Loader";
import { AUTH_USER, QueryAuth } from "../../graphql/queries/getAuth/authenticateUser";
import { client } from "../../graphql/client";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUser, addUserJWT } from "../../app/slices/userSlice";
import { emailPattern } from "../../utils/emailPattern";
import { passwordRules } from "../../utils/passwordRules";
import { usePasswordToggle } from "../../hooks/usePasswordToggle";
import './LoginForm.scss';

type Props = {
  onClose: () => void,
}

export const LoginForm: React.FC<Props> = memo(({ onClose }) => {
  const { type, toggleIcon, togglePasswordIcon } = usePasswordToggle();
  const [message, setMessage] = useState<string | null>(null);
  const userJwt = useAppSelector(state => state.user.userJWT);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<IUser>();
  const dispatch = useAppDispatch();

  const navigateToRegister = () => {
    onClose();
  }

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const authenticationData = {
        request: {
          email: data.email,
          password: data.password,
        },
      };

      const authResult = await client.query<QueryAuth>({
        query: AUTH_USER,
        variables: authenticationData,
      });

      console.log(authResult.data.authenticateUser.jwtToken)

      if (authResult.data && authResult.data.authenticateUser && authResult.data.authenticateUser.jwtToken) {
        dispatch(addUserJWT(authResult.data.authenticateUser.jwtToken));
        console.log(userJwt, 'jwt user')
        setMessage('Authentication successful!');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        console.error("Authentication failed");
        setMessage('Authentication failed. Please check your credentials!');
      }
      reset();
    } catch (error) {
      console.error("Error during authentication:", error);
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="login">
      <div className="login__top">
        <h2 className="login__title">
          {message ? (
            <span className={userJwt ? 'login__success-title' : 'login__warn-title'}>{message}</span>
          ) : (
            'Login to your personal account'
          )}
        </h2>
        <div
          className="login__close"
          onClick={onClose}
        >
          <CloseIcon />
        </div>
      </div>
      <div className="login__wrapper">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login__form"
        >
          <div className="login__email-container">
            {errors.email && <div className="login__error">{errors.email?.message}</div>}
            <input
              type="text"
              className="login__input"
              placeholder="E-mail"
              {...register('email', {
                pattern: {
                  value: emailPattern.value,
                  message: emailPattern.message,
                }
              })}
            />
          </div>
          <div className="login__password-container">
            {errors.password && <div className="login__error">{errors.password?.message}</div>}
            <input
              type={type}
              className="login__password"
              autoComplete='current-password'
              placeholder="Password"
              {...register('password', {
                minLength: {
                  value: passwordRules.minValue,
                  message: passwordRules.minMessage,
                },
                maxLength: {
                  value: passwordRules.maxValue,
                  message: passwordRules.maxMessage,
                }
              })}
            />
            <div className="login__toggle" onClick={togglePasswordIcon}>
              {toggleIcon}
            </div>
          </div>
          <button
            className="login__button"
          >
            {isLoading ? <Loader /> : 'Log in'}
          </button>
        </form>
      </div>
      <div className="login__last">
        <span className="login__lost">Forgot your password</span>
        <Link
          to="/makeup/register"
          className="login__register"
          onClick={navigateToRegister}
        >
          Registration
        </Link>
      </div>
    </div>
  );
});