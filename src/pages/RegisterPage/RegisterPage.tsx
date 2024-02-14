import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '../../types/IUser';
import { REGISTER_USER_MUTATION } from '../../graphql/mutations/RegisterMutations/registerUser';
import { Loader } from '../../components/Loader/Loader';
import { SuccessRegistration } from '../../components/SuccessRegistration/SuccessRegistration';
import { addUserJWT } from '../../app/slices/userSlice';
import { IOrder } from '../../types/IOrder';
import { UserInfoTitles } from '../../utils/inputLabels';
import { RegisterInputWithLabel } from '../../components/RegisterInputWIthLabel/RegisterInputWithLabel';
import { QueryComponent } from '../../components/QueryComponent/QueryComponent';
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
  } = useForm<IUser | IOrder>();
  const dispatch = useAppDispatch();
  const [registerUser, { error, loading }] = useMutation<MutationData>(REGISTER_USER_MUTATION);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IUser | IOrder> = async (data) => {
    try {
      const { data: registrationData } = await registerUser({
        variables: { request: data as IUser },
      });

      setIsSuccess(true);

      dispatch(addUserJWT(registrationData?.registerUser.jwtToken));
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
        <QueryComponent
          isLoading={loading}
          error={error}
          errorMessage={error?.message}
        >
          <h1 className='register__title'>Register new user</h1>
          <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
            <RegisterInputWithLabel
              name='firstName'
              label={UserInfoTitles.user?.firstName}
              register={register}
              errorMessage={error?.message}
            />
            <RegisterInputWithLabel
              name='lastName'
              label={UserInfoTitles.user?.lastName}
              register={register}
              errorMessage={error?.message}
            />
            <RegisterInputWithLabel
              name='birthdayDate'
              label={UserInfoTitles.user?.birthdayDate}
              register={register}
            />
            <RegisterInputWithLabel
              name='phoneNumber'
              label={UserInfoTitles.user?.phoneNumber}
              register={register}
              errorMessage={error?.message}
            />
            <RegisterInputWithLabel
              name='email'
              label={UserInfoTitles.user?.email}
              register={register}
              errorMessage={error?.message}
              isEmail
            />
            <RegisterInputWithLabel
              name='password'
              label={UserInfoTitles.user?.password}
              register={register}
              errorMessage={error?.message}
              isPassword
            />
            <button className='register__button'>
              {isLoading ? <Loader /> : 'Register'}
            </button>
          </form>
        </QueryComponent>
      )}
    </div>
  );
};
