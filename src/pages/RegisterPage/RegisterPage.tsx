import React, { FC, useState } from 'react';
import './RegisterPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '../../types/IUser';
import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel';
import { inputLabels } from '../../utils/inputLabels';
import { useMutation } from '@apollo/client';
import { REGISTER_USER_MUTATION } from '../../graphql/mutations/registerUser';
import { Loader } from '../../components/Loader/Loader';
import { SuccessRegistration } from '../../components/SuccessRegistration/SuccessRegistration';
import { useAppDispatch } from '../../app/hooks';
import { addUser } from '../../app/slices/userSlice';

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

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const { data: registrationData } = await registerUser({
        variables: { request: data },
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
            <InputWithLabel
              name='firstName'
              label={inputLabels.firstName}
              register={register}
              errorMessage={errors.firstName?.message}
            />
            <InputWithLabel
              name='lastName'
              label={inputLabels.lastName}
              register={register}
              errorMessage={errors.lastName?.message}
            />
            <InputWithLabel
              name='birthdayDate'
              label={inputLabels.birthdayDate}
              register={register}
            />
            <InputWithLabel
              name='phoneNumber'
              label={inputLabels.phoneNumber}
              register={register}
              errorMessage={errors.phoneNumber?.message}
            />
            <InputWithLabel
              name='email'
              label={inputLabels.email}
              register={register}
              errorMessage={errors.email?.message}
              isEmail
            />
            <InputWithLabel
              name='password'
              label={inputLabels.password}
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