import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '../../types/IUser';
import { REGISTER_USER_MUTATION } from '../../graphql/mutations/RegisterMutations/registerUser';
import { Loader } from '../../components/Loader/Loader';
import { SuccessRegistration } from '../../components/SuccessRegistration/SuccessRegistration';
import { addUser } from '../../app/slices/userSlice';
import { IOrder } from '../../types/IOrder';
import { UserInfoTitles } from '../../utils/inputLabels';
import { RegisterInputWithLabel } from '../../components/RegisterInputWIthLabel/RegisterInputWithLabel';
import './RegisterPage.scss';

interface MutationData {
  registerUser: IUser;
}

export const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<IUser>();
  const dispatch = useAppDispatch();
  const [registerUser] = useMutation<MutationData>(REGISTER_USER_MUTATION);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IUser | IOrder> = async (data) => {
    try {
      const { data: registrationData } = await registerUser({
        variables: { request: data as IUser },
      });
      setIsSuccess(true);
      dispatch(addUser(data))
      console.log('User registered successfully:', registrationData);
      alert('Data submitted successfully');
      reset();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className='register'>
      {isSuccess ? (
        <SuccessRegistration />
      ) : (
        <>
          <h1 className='register__title'>Register new user</h1>
          <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
            <RegisterInputWithLabel
              name='firstName'
              label={UserInfoTitles.user.firstName}
              register={register}
              errorMessage={errors.firstName?.message}
            />
            <RegisterInputWithLabel
              name='lastName'
              label={UserInfoTitles.user.lastName}
              register={register}
              errorMessage={errors.lastName?.message}
            />
            <RegisterInputWithLabel
              name='birthdayDate'
              label={UserInfoTitles.user.birthdayDate}
              register={register}
            />
            <RegisterInputWithLabel
              name='phoneNumber'
              label={UserInfoTitles.user.phoneNumber}
              register={register}
              errorMessage={errors.phoneNumber?.message}
            />
            <RegisterInputWithLabel
              name='email'
              label={UserInfoTitles.user.email}
              register={register}
              errorMessage={errors.email?.message}
              isEmail
            />
            <RegisterInputWithLabel
              name='password'
              label={UserInfoTitles.user.password}
              register={register}
              errorMessage={errors.password?.message}
              isPassword
            />
            <button className='register__button'>
              {isLoading ? <Loader /> : 'Register'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};
