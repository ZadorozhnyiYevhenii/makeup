import React, { FC } from 'react';
import './RegisterPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '../../types/IUser';
import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel';
import { inputLabels } from '../../utils/inputLabels';

export const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = (data) => {
    alert(`Your name ${data}`);
    console.log(data)
    reset();
  }

  return (
    <div className='register'>
      <h1 className='register__title'>Register new user</h1>
      <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel
          name='name'
          label={inputLabels.name}
          register={register}
          errorMessage={errors.name?.message}
        />

        <InputWithLabel
          name='surname'
          label={inputLabels.surname}
          register={register}
          errorMessage={errors.surname?.message}
        />

        <InputWithLabel
          name='birthDate'
          label={inputLabels.birthDate}
          register={register}
        />

        <InputWithLabel
          name='phone'
          label={inputLabels.phone}
          register={register}
          errorMessage={errors.phone?.message}
        />

        <InputWithLabel
          name='email'
          label={inputLabels.email}
          register={register}
          errorMessage={errors.email?.message}
          isEmail
        />
        <button className='register__button'>
          Register
        </button>
      </form>
    </div>
  );
};
